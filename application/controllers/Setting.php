<?php
require(APPPATH.'libraries/REST_Controller.php');
class Setting extends REST_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('settingmodel');
                $this->load->helper('url_helper');
        }
        public function membershipList_get(){
            $result = $this->settingmodel->getMembershipSetting();
            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),204);
            }
        }
        public function membershipList_put(){
            $data = array(
                "MonthFee"=> $this->put("MonthFee"), 
                "YearFee"=> $this->put("YearFee"), 
                "LimitTimes"=>($this->put("LimitTimes")=="")?NULL:$this->put("LimitTimes"), 
                "AdminHelpYN"=>$this->put("AdminHelpYN")
                );
            $Level = $this->put("Level");

            $result = $this->settingmodel->updateMembershipSetting($data,$Level);

            if($result){
                $this->response($result,200);
            }else{
                $this->response(array(),204);
            }
        }
}