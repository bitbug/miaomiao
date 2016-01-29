<?php
require(APPPATH.'libraries/REST_Controller.php');
class User extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper('url');
                $this->load->library('mmsecurity');
                $this->mmUser = $this->mmsecurity->getMmUser();

        }

        public function user_get(){

                $userid = ($this->get('Id')) ? $this->get('Id') : $_SESSION['package']['Id'];
                $username = ($this->get('UserName')) ? $this->get('UserName') : $_SESSION['package']['UserName'];

                $data = array(
                        "UserName"=>$username,
                        "Id"=>$userid
                        );
                //load the model
                $this->load->model('usermodel');

                $result = $this->usermodel->getUserInfo($data);

                //Add in the IPAddress
                $result[0]['IPAddress'] = $this->get_client_ip();

                if($result){
                    $this->response($result[0], 200);    
                }else{
                    $this->response(array(), 200);    
                }
        }
        public function userList_get(){
            $data=array(
                "UserDateVoid"=>NULL,
                "Role"=>0
                );
            $this->load->model("usermodel");
            $result = $this->usermodel->getUserList($data);

            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),200);
            }
        }
        public function userList_put(){
            $Id = $this->put("Id");
            $RealName = $this->put("RealName");
            $Membership = $this->put("Membership");
            $PhoneNumber = $this->put("PhoneNumber");
            $Email = $this->put("Email");
            $Address = $this->put("Address");
            $UserDateVoid = $this->put("UserDateVoid");
            $data=array(
                "RealName"=>$RealName,
                "Membership"=>$Membership,
                "PhoneNumber"=>$PhoneNumber,
                "Email"=>$Email,
                "Address"=>$Address,
                "UserDateVoid"=>$UserDateVoid
                );
            $this->load->model("usermodel");
            $result = $this->usermodel->updateUser($data,$Id);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),200);
            }

        }
        private function get_client_ip() {
            $ipaddress = '';
            if (getenv('HTTP_CLIENT_IP'))
                $ipaddress = getenv('HTTP_CLIENT_IP');
            else if(getenv('HTTP_X_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
            else if(getenv('HTTP_X_FORWARDED'))
                $ipaddress = getenv('HTTP_X_FORWARDED');
            else if(getenv('HTTP_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_FORWARDED_FOR');
            else if(getenv('HTTP_FORWARDED'))
               $ipaddress = getenv('HTTP_FORWARDED');
            else if(getenv('REMOTE_ADDR'))
                $ipaddress = getenv('REMOTE_ADDR');
            else
                $ipaddress = 'UNKNOWN';
            return $ipaddress;
}
}