<?php
require(APPPATH.'libraries/REST_Controller.php');
class News extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('newsmodel');
                $this->load->helper('url_helper');
        }
        public function getArticleById_get(){
                $filter = array(
                    "ArticleDateVoid"=>NULL,
                    "ArticleId"=>$this->get("ArticleId")
                    );
                $result = $this->newsmodel->getArticle($filter);
                if($result){
                    $this->response($result[0],200);
                }else{
                    $this->response(array(),204);
                }
        }
        public function articleList_get(){

                $filter=array(
                        "ArticleDateVoid"=>NULL
                        );
                $result = $this->newsmodel->getAllArticle($filter);

                if($result){
                        $this->response($result,200);
                }else{
                        $this->response(array(),204);
                }
        }
        public function articleList_put(){
                $data=array(
                "Title"=>$this->put("Title"), 
                "Slug"=> $this->put("Slug"), 
                "Content"=>$this->put("Content"),
                "ArticleDateVoid"=>$this->put("ArticleDateVoid")
                );
                $ArticleId = $this->put("ArticleId");
            $result = $this->newsmodel->updateArticle($data,$ArticleId);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array("message"=>"no result"),204);
            }
        }
        public function articleList_post(){
            $data=array(
                "Title"=>$this->post("Title"), 
                "Slug"=>$this->post("Slug"), 
                "Content"=>$this->post("Content"), 
                "Author"=>$this->post("Author"), 
                "ArticleDateCreated"=>$this->post("ArticleDateCreated")
                );
            $result = $this->newsmodel->createNews($data);
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array("message"=>"no result"),204);
            }

                
        }
}