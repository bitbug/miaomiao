<?php
require(APPPATH.'libraries/REST_Controller.php');
class Products extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('productmodel');
                $this->load->helper('url_helper');
        }
        public function sellingListing_get(){
                $data = array("Type"=>"selling");
                $result = $this->productmodel->getSellingList($data);

                if($result){
                        $this->response($result,200);
                }else{
                        $this->response(array("message"=>"no result"),204);
                }
        }
}