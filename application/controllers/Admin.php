<?php

class Admin extends CI_Controller {

    

    //--------------------------------------------------------------------------
    //Builds the inital class each time the page is loaded.
    public function __construct() {
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('mmsecurity');
    }

    //Main landing page for... everything
    public function index(){

        $this->load->view('home/dashboard');
    }

}
?>
