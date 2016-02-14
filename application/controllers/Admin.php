<?php

class Admin extends CI_Controller {

    

    //--------------------------------------------------------------------------
    //Builds the inital class each time the page is loaded.
    public function __construct() {

        parent::__construct();
        session_start();

        if(array_key_exists("package", $_SESSION)&&$_SESSION["package"]["Role"]==0){
            session_unset();
            session_destroy();
            session_start();
        }
        //session_destroy();

        $this->last_url = "App/adminDashboard";
        // $this->last_url = "index.php".$this->last_url;

        //See if the session has an last login time on it.
        $LastLoginAttempt = (array_key_exists('LastLoginAttempt', $_SESSION)) ? $_SESSION['LastLoginAttempt'] : '';

        //Clear the session.
        

        //Reset the last login session.
        $_SESSION['LastLoginAttempt'] = $LastLoginAttempt;

        $this->load->database();
        $this->load->helper('url');
        
    }

     //@@Main landing page
    public function index(){
        //load the login view
        $data["last_url"]=$this->last_url; 
        $this->load->view('home/login',$data);
          
    }
    //go to admin dashboard
    public function dashboard(){

         header("Content-Type: application/json", true, 200);
         exit(json_encode($_SESSION));
        //$this->load->library("mmsecurity");
        //$this->load->view('home/dashboard');
    }

    public function adminLogin(){
        //get post data
        $UserName = $this->input->post("UserName");
        $PassWord = $this->input->post("PassWord");

        //if the posted data isn't complete 
        if(!$UserName||!$PassWord){
            header("Content-Type: text/plain", true, 400);
            exit("请填写完整信息");

        }

        // If the last attempt was less than 3-6 seconds, return an error
        if(isset($_SESSION["LastLoginAttempt"])){
            if(time()-$_SESSION["LastLoginAttempt"]<rand(3,5)){
                header("Content-Type: text/plain", true, 400);
                exit("请稍等几秒再尝试登录");
            }
        }
        
        //hide database error from the client end
        $this->db->db_debug=false;

        //send data to the backend and get user information
        $this->load->model("adminmodel");

        // $data = array(
        //     'UserName'=>$UserName
        //     );

        $attempt = $this->adminmodel->adminLogin($UserName,$PassWord);

        $_SESSION["LastLoginAttempt"] = time();
        $this->createPackage($attempt[0]);

        if(sizeof($attempt[0])>0&&$attempt[0]["Role"]==1){
            header("Content-Type: application/json", true, 200);
            exit(json_encode($attempt[0]));

        }else{
            header("Content-Type: text/plain", true, 400);
            exit("用户名或密码错误");
        }

    }
    private function createPackage($r) {
        //Set the Session Variables for this User in the Package Array for future initializations.
        $_SESSION["package"] = array(
            "UserName"=>$r["UserName"],
            "ActiveSession"=>'true',
            "Id"=>$r["UserId"],
            "Role"=>$r["Role"],
            "TimeStamp"=>time()
        );

    }

}
?>
