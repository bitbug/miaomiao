<?php
require(APPPATH.'libraries/REST_Controller.php');
class Products extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('productmodel');
                $this->load->library('mmsecurity');
                $this->load->helper('url_helper');
        }
        public function product_post(){
            $data=array(
                "Description"=>$this->post("Description"),
                "Location"=>$this->post("Location"),
                "Name"=> $this->post("Name"),
                "Price"=> $this->post("Price"),
                "ProductType"=> $this->post("ProductType"),
                "Quant"=> $this->post("Quant"),
                "Type"=>$this->post("Type"),
                "Unit"=> $this->post("Unit"),
                "ProductDateCreated"=>$this->post("ProductDateCreated"),
                "UserCreated"=>$this->post("UserCreated")
                );
            $result = $this->productmodel->createProduct($data);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array("message"=>"no result"),204);
            }

                
        }
        public function productListing_get(){
                if($this->get("Type")&&$this->get("ProductType")){

                    $Type = $this->get("Type");
                    $ProductType = $this->get("ProductType");

                    $data = array("Type"=>$Type,
                                  "ProductType"=>$ProductType,
                                  "DateVoid"=>NULL);
                }else{
                    $data = array("DateVoid"=>NULL);
                }

                $result = $this->productmodel->getProductList($data);

                if($result){
                        $this->response($result,200);
                }else{
                        $this->response(array("message"=>"no result"),204);
                }
        }
        public function productListing_put(){
                $Id = $this->put("ProductId");
                $Name = $this->put("Name");
                $Quant = $this->put("Quant");
                $Unit = $this->put("Unit");
                $Price = $this->put("Price");
                $Location = $this->put("Location");
                $Description = $this->put("Description");
                $DateVoid = $this->put("DateVoid");
                $data = array(
                        "Name"=>$Name,
                        "Quant"=>$Quant,
                        "Unit"=>$Unit,
                        "Price"=>$Price,
                        "Location"=>$Location,
                        "Description"=>$Description,
                        "DateVoid"=>$DateVoid
                        );
                $result = $this->productmodel->updateProductItem($data,$Id);
                if($result){
                        $this->response($result,200);
                }else{
                        $this->response(array("message"=>"error"),204);
                }

        }
        public function productsByUser_get(){
            $filter = array(
                "UserCreated"=>$this->get("UserCreated"),
                "DateVoid"=>null
                );
            $result = $this->productmodel->getProductsByUser($filter);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array("message"=>"no result"),204);
            }

        }
        public function productPhoto_get(){
            $FileType = $this->get("FileType");
            $ProductId = $this->get("ProductId");

            $result = $this->productmodel->getProductPhoto($FileType,$ProductId);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),204);
            }
        }
        public function productPhoto_post(){

        $ProductId = $this->post('ProductId');
        $FileType = $this->post('FileType');
        $UserId = $this->post('UserId');
    
        $this->load->helper('form');
        $filepath = 'uploaded/' . '/'.$UserId.'/' . '/'.$FileType. '/' . $ProductId. '/';
         if (!is_dir($filepath)):
            mkdir($filepath, 0775, TRUE);
        endif;

        $config['upload_path'] = $filepath;
        $config['allowed_types'] = 'gif|jpg|png|tiff|bmp|pdf';
        $config['max_size'] = '5000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload()):
            $error = array('error' => $this->upload->display_errors());
        endif;

        $fData = $this->upload->data();
        $filename = $fData['file_name'];
        $filepath .= $fData['file_name'];


        $return = $this->productmodel->addFile($UserId, $ProductId, $filepath, $filename, $FileType);

        if($return){
            $this->response($return, 200);
        } else{
            $this->response('No Results', 200);
        }
        
    }
}