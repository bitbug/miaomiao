<?php
class mmsecurity {
    public $MMUSER = '';
    
    //This is the Code igniter instance that we're working on.
    private $CI = '';

    public function __construct($location = 'none', $row = '') {
        
        //Start the Session
        session_start();
        $this->CI = & get_instance();

        //Classes Required for DB Connections.
        require('Include/MMUSER.class');

        //Is this a login page or a normal page?
        $lUp = (is_array($location)) ? 'login' : 'none';

        if ($lUp == 'none'):
            //If this user is logged in then create a new class based on that user for this page.  Globally this user will always be 'Webpayuser' so its easy to get items
            if (array_key_exists('package', $_SESSION)):
                    $this->MMUSER = new MMUSER($_SESSION['package']);        
            else:
                $this->killUserSession();
            endif;

        else:
            MMUSER::CI_Login($location['row']);
        endif;
    }
    public function getMmUser(){
        session_write_close();
        return $this->MMUSER;
    }
    public function killUserSession(){
        session_unset();
        if(strpos($_SERVER['HTTP_ACCEPT'], 'json') === false){
            header("location: /?SessionExpired=true");
        }else{
            header("HTTP/1.1 403 Forbidden");
        }
        exit();
    }

}
?>