<?php
define("TOKEN","Xidian2016");

$wechatObj = new wechatCallback();
$wechatObj->valid();

class wechatCallback
{
    public function valid()
    {
        $echoStr = $_GET["echostr"];

        if ($this->checkSignature())
        {
        	echo $echoStr;
            exit;
        }
    }

    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = TOKEN;

        $tempArray = array($token, $timestamp, $nonce);

        sort($tempArray, SORT_STRING);

        $tempStr = implode($tempArray);
        $tempStr = sha1($tempStr);

        if ($tempStr==$signature)
            return true;
        else
            return false;
    }
}
?>