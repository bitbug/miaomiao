<?php

class App extends CI_Controller {

    

    //--------------------------------------------------------------------------
    //Builds the inital class each time the page is loaded.
    public function __construct() {
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('mmsecurity');
    }
    
	    //go to admin dashboard
    public function adminDashboard(){
        $this->load->view('home/dashboard');
    }
}
?>
