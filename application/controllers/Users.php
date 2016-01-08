<?php
require(APPPATH.'libraries/REST_Controller.php');
class News extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper('url_helper');

                //load the encryption library
                $this->load->library("encryption");

                //check if user exists
                $this->mmsecurity->usercheck();
        }
        public function index(){
                if(!defined("MMLOGEDIN")):

                //load login section
                $this->response()
        }
        public function adminLogin_post(){
                $UserName = $this->post("UserName");
                $PassWord = $this->post("PassWord");
                $this->load->model('usermodel');
                $result = $this->usermodel->adminLogin($UserName,$PassWord);

                $this->response($result);
        }
        // public function getAllNews_get(){
        //         $slug = ($this->get('slug'))?$this->get('slug'):FALSE;

        //         $result = $this->newsmodel->get_news($slug);

        //         if($result){
        //                 $this->response($result,200);
        //         }else{
        //                 $this->response(array("message"=>"no result"),204);
        //         }
        // }
        // public function index()
        // {
        //         $data['news'] = $this->news_model->get_news();
        // }

        // public function view($slug = NULL)
        // {
        //         $data['news_item'] = $this->news_model->get_news($slug);
        // }
}