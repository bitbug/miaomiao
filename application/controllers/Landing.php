<?php    
    class Landing extends CI_Controller{

    //@@Controller
    public function __construct() {
        parent::__construct();
        
        session_start();

        //See if the session has an last login time on it.
        $LastLoginAttempt = (array_key_exists('LastLoginAttempt', $_SESSION)) ? $_SESSION['LastLoginAttempt'] : '';

        //Clear the session.
        $_SESSION = array();

        //REfresh
        session_unset();
        session_destroy(); // kill the session to log out any current one
        session_start(); // start it again to perform a fresh login

        //Reset the last login session.
        $_SESSION['LastLoginAttempt'] = $LastLoginAttempt;
        $this->load->database();
        $this->load->helper("url");


    }

    //@@Main landing page see 
    public function index(){
        $this->userLogin();
          
    }
    public function userLogin(){
         //get post data, data is designed to come from wechat API making RESTFUL call like following:
        // $UserName = $this->input->post("UserName");
        // $PassWord = $this->input->post("PassWord");

        //for testing purpose we use data already known like following:
        $WechatID = "13812341234";
        $PassWord = "lintest";

        //if the posted data isn't complete 
        if(!$WechatID||!$PassWord){
            header("Content-Type: text/plain", true, 400);
            exit("请填写完整信息");

        }

        // If the last attempt was less than 3-6 seconds, return an error
        if(isset($_SESSION["LastLoginAttempt"])){
            if(time()-$_SESSION["LastLoginAttempt"]<rand(1,3)){
                header("Content-Type: text/plain", true, 400);
                exit("请稍等几秒再尝试登录");
            }
        }
        
        //hide database error from the client end
        $this->db->db_debug=false;

        //send data to the backend and get user information
        $this->load->model("usermodel");

        // $data = array(
        //     'UserName'=>$UserName
        //     );

        $attempt = $this->usermodel->userLogin($WechatID,$PassWord);

        $_SESSION["LastLoginAttempt"] = time();

        if(sizeof($attempt[0])>0){
            $this->createPackage($attempt[0]);
            // header("Content-Type: application/json", true, 200);
            // exit(json_encode($attempt[0]));
            $this->load->view("home/home");

        }else{
            header("Content-Type: text/plain", true, 400);
            exit("用户名或密码错误");
        }
    }
    private function createPackage($r) {
        //Set the Session Variables for this User in the Package Array for future initializations.
        $_SESSION["package"] = array(
            "UserName"=>$r["UserName"],
            "WechatID"=>$r["WechatId"],
            "ActiveSession"=>'true',
            "Id"=>$r["UserId"],
            "Role"=>$r["Role"],
            "TimeStamp"=>time()
        );

    }

    
}

?>
