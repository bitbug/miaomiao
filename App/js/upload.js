define(['jquery',
    'underscore',
], function($, _) {
    //Constructor
    var Upload = function(view, options) {
        //defaults
        this.options = {
            sizeLimit: 2048, //KB,  ~2MB
            maxFiles: 5,
            url: '/Products/productPhoto',
            FileType: null,
            ProductId: null,
            UserId: null,
            allowedExtensions: ['jpeg', 'jpg', 'pdf', 'doc', 'gif', 'xls', 'xlsx', 'docx'],
            maxSize: 4096 //4MB
        };

        this.view = view;

        //extend default with passed in options...
        this.options = $.extend(this.options, options);

        //array of file objects
        this.file = [];
        this.fileCounter = 1;

        //the template, mostly here for a visual...but this is implimented so don't remove :)
        this.fileTemplate = {
            fileName: 'theFile-name-here.zip',
            status: 'pending',
            extension: 'zip',
            type: 'image/jpeg',
            fileSize: '1000',
            uploadResponse: undefined,
            fileObj: 'OBJHERE'
        };

        this.bindEvents();

        this.errorMessage = [];
    };

    //methods
    Upload.prototype = {
        isValidFile: function(file) {
            //This section will need a fair amount of work to get right...
            //Need to make sure only allowed documents are uploaded..
            var flag = true; //default

            //based on file size (this SHOULD rule out folders and links)
            if (file.size < 1 && flag) {
                var error = {
                    message: file.name + ' is not a valid file (size = 0)',
                    file: file
                }
                this.errorMessage.push(error);


                flag = false;
            };

            //based on file size
            var fileSize = file.size / 1024;
            if ((fileSize > this.options.maxSize) && flag) {
                var error = {
                    message: file.name + ' is too large.',
                    file: file
                }
                this.errorMessage.push(error);

                flag = false;
            };

            //based on simple extension lookup...
            var extArray = file.name.split('.');
            if ((extArray.length > 1)) {
                var extension = _.last(extArray);
            }


            if (extension !== undefined && _.indexOf(this.options.allowedExtensions, extension) && flag !== false) {
                //all is good...nothing to do here...
            } else {
                var error = {
                    message: file.name + ' is not a supported file extension.',
                    file: file
                }
                this.errorMessage.push(error);

                flag = false;
            }

            return flag;
        },
        addFiles: function(files) {
            var _this = this;

            this.addToFileList(files).done(function() {
                _this.throwErrors();

                if (!_this.isProcessingList) {
                    _this.startUpload();
                } else {
                    //already processing...
                }

            });
        },
        throwErrors: function() {
            var _this = this;
            if (this.errorMessage.length > 0) {
                var clonedObj = _.clone(this.errorMessage);

                //setTimeout(function() {
                _this.triggerError('fileAddError', clonedObj);
                _this.errorMessage = [];
                //}, 500)


                //this.errorMessage = [];
            }

        },
        startUpload: function() {
            this.isProcessingList = true;

            var _this = this,
                nextFile = this.getNextFileForUpload();

            if (nextFile) {
                this.uploadFile(nextFile.uid).done(function() {
                    _this.startUpload();
                });
            } else {
                //no more files to upload...
                this.isProcessingList = false;
                this.triggerEvent('queueComplete');
            }

        },
        getNextFileForUpload: function() {
            var file = _.findWhere(this.file, {
                status: 'pending'
            });

            return file;
        },
        addToFileList: function(files) {
            var filesInObj = 0,
                _this = this,
                def = $.Deferred();


            Object.keys(files).forEach(function(key, index) {
                var file = files[key];

                if (!isNaN(key)) {
                    filesInObj++;

                    if (_this.isValidFile(file)) {
                        var fileTemplate = _.clone(_this.fileTemplate),
                            nameArray = file.name.split('.');

                        //set the properties of our new file object
                        fileTemplate.uid = 'f' + _this.fileCounter;
                        fileTemplate.fileName = file.name;
                        fileTemplate.status = 'pending';
                        fileTemplate.extension = nameArray[nameArray.length - 1];
                        fileTemplate.type = file.type;
                        fileTemplate.fileSize = parseFloat(file.size / 1024).toFixed(2); //should be KB... 
                        fileTemplate.uploadResponse = undefined;
                        fileTemplate.fileObj = file;

                        //add to the file array
                        _this.file.push(fileTemplate);

                        _this.fileCounter++;

                        //trigger file added...
                        setTimeout(function() {
                            _this.triggerEvent('fileAdded', fileTemplate.uid);
                        }, 0);
                    }



                }

                if (filesInObj == (index + 1)) {
                    def.resolve();
                }
            });


            return def.promise();

        },
        getStatus: function() {
            var status = {};

            status.pending = _.where(this.file, {
                status: 'pending'
            }).length;

            status.uploading = _.where(this.file, {
                status: 'uploading'
            }).length;

            status.complete = _.where(this.file, {
                status: 'complete'
            }).length;

            return status;
        },
        uploadFile: function(uid) {
            this.xhr = new XMLHttpRequest();
            var _this = this,
                file = this.getFileByUID(uid),
                _this = this,
                def = $.Deferred();


            var formData = new FormData();

            formData.append('FileType', this.options.FileType);
            formData.append('UserId', this.options.UserId);
            formData.append('ProductId', this.options.ProductId);
            formData.append('userfile', file.fileObj);

            if (this.xhr.upload) {

                this.xhr.upload.addEventListener("progress", function(event) {
                    file.status = 'uploading';
                    _this.uploadProgress(uid, event);


                });

                this.xhr.upload.addEventListener("load", function(event) {
                    _this.uploadProgress(uid, event);
                });

                this.xhr.onreadystatechange = function(e) {

                    if (_this.xhr.readyState == 4) {
                        var response = $.parseJSON(_this.xhr.response);

                        file.uploadResponse = response;
                        file.status = 'complete';
                        def.resolve();
                    }
                };

                // start upload
                this.xhr.open("POST", this.options.url, true);
                this.xhr.send(formData);
            }

            return def.promise();
        },
        uploadProgress: function(uid, event) {
            var _this = this,
                file = this.getFileByUID(uid);

            file.uploadedSize = event.loaded;
            file.uploadedPercent = parseInt((event.loaded / event.total) * 100);

            setTimeout(function() {
                _this.triggerEvent('progress', uid);
            }, 0);

        },

        cancelUpload: function(uid) {
            var _this = this;

            if (this.xhr.readyState < 4) {
                this.xhr.abort();
            } else {

                $.ajax({
                    url: _this.options.url,
                    type: 'delete',
                    data: $.param({
                        id: _this.getFileByUID(uid).uploadResponse.documentID
                    })
                });


            }

            this.triggerEvent('fileRemoved', uid);
        },
        bindEvents: function() {
            var _this = this;

            //file added event
            //$(this).on('fileAdded', function(e, uid) {
            //_this.uploadFile(uid);
            //console.log('added')
            //});
        },
        getFileByUID: function(uid) {
            var _this = this;

            return _.findWhere(this.file, {
                uid: uid
            });
        },
        triggerEvent: function(eventName, uid) {
            var _this = this;
            $(this).trigger(eventName, uid)
            this.view.$el.trigger(eventName, this.getFileByUID(uid));
        },
        triggerError: function(eventName, obj) {
            var _this = this;
            var obj = {
                errors: obj
            }
            $(this).trigger(eventName, obj)
            this.view.$el.trigger(eventName, obj);


        }
    };


    return Upload;
});