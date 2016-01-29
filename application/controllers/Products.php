<?php
require(APPPATH.'libraries/REST_Controller.php');
class Products extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('productmodel');
                $this->load->helper('url_helper');
        }
        public function productListing_get(){
                $Type = $this->get("Type");
                $ProductType = $this->get("ProductType");

                $data = array("Type"=>$Type,
                              "ProductType"=>$ProductType,
                              "DateVoid"=>NULL);

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
}