<?php
define("APP_ID", "wxb872ed55fcbd3b5a");
define("APP_SECRET", "d93c4370ad22e32022b022df48eb1d07");
define("DB_HOST", "sdm163155163.my3w.com");
define("DB_USER", "sdm163155163");
define("DB_PASSWORD", "Xidian2016");
define("DB_NAME", "sdm163155163_db");
define("TOKEN_TYPE", 1);
define("JSAPI_TYPE", 2);
define("TIKET_TYPE", 3);
define("DEBUG", false);
define("PRE_EXPIRED", 60);

class WxSdk
{
    # 获取 JsApi 的签名包，用于网页开发时对微信的Js接口进行配置
    # $url               - 要配置的页面的 Url
    # $createJsApiToken  - 使用一个新创建的凭据
    public function getJsApiSignPackage($url, $createJsApiToken = false)
    {
        $package = null;

        $jsapi_token = null;

        if ($createJsApiToken)
            $jsapi_token = $this->createJsApiToken();
        else
            $jsapi_token = $this->getJsApiToken();

        if ($jsapi_token)
        {
            $timestamp = time();
            $nonceStr = $this->createNonceStr();
            
            # 要按照 key 值 ASCII 码升序排序
            $string = "jsapi_ticket=$jsapi_token&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
            
            $signature = sha1($string);

            # 生成签名包
            # 微信分享时跳转的 URL 目前就用当前页面
            # 微信分享时的标题和描述目前写死
            # 分享时的Logo写死
            $package = array(			  
                "appId"     => APP_ID,
                "timestamp" => $timestamp,
                "nonceStr"  => $nonceStr,
                "signature" => $signature,            
                "url"       => $url,
                "title"     => "西点金融 - 优质香港保险",
                "desc"      => "西点金融网为广大客户提供更为优质的香港保险产品，香港保险费率更低，保障更全，保额更高，投资回报高。立即预约，即可获得香港保险顾问一对一为您定制的投保计划书",
                "logo"      => "http://www.westpointfinance/images/shareLogo.jpg",		
            );
        }
        
        return $package;
    }

    # 获取 JsApi 凭据
	private function getJsApiToken()
	{
		$jsapi_token = null;

		$authentication = $this->getAuthentication(JSAPI_TYPE);

        if ($authentication)
        {
            $now = time();

            if ($authentication->ExpiredTime <= $now)
                $jsapi_token = $this->createJsApiToken();
            else
                $jsapi_token = $authentication->Value;
        }
        else
        {
            $jsapi_token = $this->createJsApiToken();
        }

		return $jsapi_token;
	}

    # 创建 JsApi 凭据
	private function createJsApiToken()
	{
		$jsapi_token = null;

		$now = time();

		$rsp = $this->wxGetJsApiToken();

		if ($rsp)
		{
			$jsapi_token = $rsp->ticket;
            
            # 比微信的过期时间提前一些
			$expiredTime = $now + $rsp->expires_in;

			$this->setAuthentication(JSAPI_TYPE, $jsapi_token, $expiredTime);
		}

		return $jsapi_token;
	}

    # 调用微信接口获取 JsApi 凭据
	private function wxGetJsApiToken()
	{
		$response = null;

		$access_token = $this->getAccessToken();

		if ($access_token)
		{
			$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=".$access_token;

			$rsp = json_decode($this->httpGet($url));

			if ($rsp)
			{
				switch ($rsp->errcode)
				{
					case 0:
						$response = $rsp;
						break;
                    # 若微信接口凭据无效或者过期，则请求新的微信凭据，然后再用新的微信凭据请求JsApi凭据
					case 40001:
					case 40014:
					case 42001:
						$response = $this->wxGetJsApiTokenUsingNewAccess();
						break;
					default:
						break;
				}
			}
		}

		return $response;
	}

    # 创建一个新的微信接口凭据来请求 JsApi 凭据
	private function wxGetJsApiTokenUsingNewAccess()
	{
		$response = null;

		$access_token = $this->createAccessToken();

		if ($access_token)
		{
			$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=".$access_token;

			$rsp = json_decode($this->httpGet($url));

			if ($rsp && $rsp->errcode == 0)
				$response = $rsp;
		}

		return $response;
	}

    # 获取微信接口凭据
	private function getAccessToken()
	{
		$access_token = null;

		$authentication = $this->getAuthentication(TOKEN_TYPE);

        if ($authentication)
        {
            $now = time();

            if ($authentication->ExpiredTime <= $now)
                $access_token = $this->createAccessToken();
            else
                $access_token = $authentication->Value;
        }
        else
        {
            $access_token = $this->createAccessToken();
        }

        $access_token = $authentication->Value;

		return $access_token;
	}

    # 创建一个微信接口凭据
	private function createAccessToken()
	{
		$access_token = null;

		$now = time();

		$rsp = $this->wxGetAccessToken();

		if ($rsp && $rsp->access_token)
		{
			$access_token = $rsp->access_token;

            # 比微信的过期时间提前一些
			$expiredTime = $now + $rsp->expires_in;

			$this->setAuthentication(TOKEN_TYPE, $access_token, $expiredTime);
		}

		return $access_token;
	}

    # 调用微信接口获取凭据
	private function wxGetAccessToken()
	{
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APP_ID."&secret=".APP_SECRET;

		$rsp = json_decode($this->httpGet($url));

		return $rsp;
	}

    # 创建随机字符串
    private function createNonceStr($length = 16)
	{
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		$str = "";
		for ($i = 0; $i < $length; $i++) {
			$str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
		}
		return $str;
	}

    # 获取微信认证记录
    private function getAuthentication($type)
	{
		$value = null;

		$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

		if ($con)
		{
			mysql_select_db(DB_NAME, $con);

			$idr = mysql_query("SELECT * FROM WxAuthentication WHERE AuthenticationType = {$type} ORDER BY ExpiredTime DESC LIMIT 1", $con);

			if ($o = mysql_fetch_object($idr))
				$value = $o;

			mysql_close($con);
		}

		return $value;
	}

    # 设置微信认证记录
	private function setAuthentication($type, $value, $expiredTime)
	{
		$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

		if ($con)
		{
			mysql_select_db(DB_NAME, $con);

			$query = "INSERT INTO WxAuthentication(AuthenticationType, Value, ExpiredTime) VALUES({$type},'{$value}', {$expiredTime})";

			mysql_query($query, $con);

			mysql_close($con);
		}
	}

    # HttpGet 请求微信接口
    private function httpGet($url)
	{
		$curl = curl_init();

        # 启用Ssl，若验证失败可下载证书：http://curl.haxx.se/ca/cacert.pem
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 500);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($curl, CURLOPT_URL, $url);

		$rsp = curl_exec($curl);

		curl_close($curl);

		return $rsp;
	}
}
?>
