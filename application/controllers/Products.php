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
        public function productById_get(){
            $data = array(
                "ProductId"=>$this->get("ProductId"),
                "DateVoid"=>NULL
                );
            $result = $this->productmodel->getProductById($data);
            if($result){
                $this->response($result[0],200);
            }else{
                $this->response(array(),204);
            }
        }
        public function productById_put(){
             $Id = $this->put("ProductId");
                $Name = $this->put("Name");
                $NameUni = $this->unicode_encode($Name,false);
                $Quant = $this->put("Quant");
                $Unit = $this->put("Unit");
                $Price = $this->put("Price");
                $Location = $this->put("Location");
                $LocationUni = $this->unicode_encode($Location,false);
                $Description = $this->put("Description");
                $DateVoid = $this->put("DateVoid");
                $data = array(
                        "Name"=>$Name,
                        "NameUni"=>$NameUni,
                        "Quant"=>$Quant,
                        "Unit"=>$Unit,
                        "Price"=>$Price,
                        "Location"=>$Location,
                        "LocationUni"=>$LocationUni,
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
        public function product_post(){
            $data=array(
                "Description"=>$this->post("Description"),
                "Location"=>$this->post("Location"),
                "LocationUni"=>$this->unicode_encode($this->post("Location"),false),
                "Name"=> $this->post("Name"),
                "NameUni"=>$this->unicode_encode($this->post("NameUni"),false),
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
        public function searchProduct_get(){
            $Query = $this->get("Query");
            $ProductType = $this->get("ProductType");
            $Type = $this->get("Type");

            $result = $this->productmodel->getSearchResult($this->unicode_encode($Query,false),$ProductType,$Type);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),204);
            }
        }
        public function productListing_get(){
                $data = array("DateVoid"=>NULL);

                if($this->get("Type")){

                    $Type = $this->get("Type");                  
                    $data = array_merge($data,array("Type"=>$Type));
                }
                if($this->get("ProductType")){
                    $ProductType = $this->get("ProductType");
                    $data = array_merge($data,array("ProductType"=>$ProductType));
                }

                if($this->get("RelateProduct")){
                    $RelateProduct = $this->get("RelateProduct");
                    $data = array_merge($data,array("RelateProduct"=>$RelateProduct));
                }
                
                if($this->get("UserCreated")){
                    $UserCreated = $this->get("UserCreated");
                    $data = array_merge($data,array("UserCreated"=>$UserCreated));
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
                $NameUni = $this->unicode_encode($Name,false);
                $Quant = $this->put("Quant");
                $Unit = $this->put("Unit");
                $Price = $this->put("Price");
                $Location = $this->put("Location");
                $LocationUni = $this->unicode_encode($Location,false);
                $Description = $this->put("Description");
                $DateVoid = $this->put("DateVoid");
                $data = array(
                        "Name"=>$Name,
                        "NameUni"=>$NameUni,
                        "Quant"=>$Quant,
                        "Unit"=>$Unit,
                        "Price"=>$Price,
                        "Location"=>$Location,
                        "LocationUni"=>$LocationUni,
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
    public function productPhoto_put(){
        $FileDateVoid = $this->put("FileDateVoid");
        $FileId = $this->put("FileId");
        $result = $this->productmodel->voidProductPhoto($FileDateVoid,$FileId);
        if($result){
            $this->response(array("message"=>"success"),200);
        }else{
            $this->response(array("message"=>"error"),204);
        }
    }
    public function unicode_encode($str, $s) {
    $str = strtolower($str);
    $char = 'UTF-8';
    $arr = array();
    $out = "";
    $c = mb_strlen($str,$char);
    $t = false;

    for($i =0;$i<$c;$i++){
        $arr[]=mb_substr($str,$i,1,$char);
    }

    foreach($arr as $i=>$v){
        if(preg_match('/\w/i',$v,$match)){
            $out .= $v;
            $t = true;
        }else{
            if($t) $out .= " ";
            if(isset($s) && $s) $out .= "+";
            $out .= bin2hex(iconv("UTF-8","UCS-2",$v))." ";
            $t = false;
        }
    }
    return $out;
}


}