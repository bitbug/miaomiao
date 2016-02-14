<?php
class usermodel extends CI_Model {

        public function __construct()
        {       
                parent::__construct();
                $this->load->database();
        }

        public function userLogin($WechatID,$PassWord){
                $data = array(
                        "WechatID"=>$WechatID,
                        "PassWord"=>md5($PassWord)
                );
                $this->db->where($data);
                $this->db->from('login');

                $query = $this->db->get();
                return $query->result_array();
        }

        public function getUserInfo($data){
                $this->db->where($data);
                $this->db->from('e_entity');

                $query=$this->db->get();
                return $query->result_array();
        }
        public function getUserList($data){
                $this->db->where($data);
                $this->db->from('e_entity');
                $this->db->join('t_membership','e_entity.Membership = t_membership.Level');

                $query=$this->db->get();
                return $query->result_array();
        }
        public function updateUser($data,$Id){
                $this->db->where("Id",$Id);
                $this->db->update("e_entity",$data);
                return "ok";
        } 
}