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
define("DEBUG", true);

class JsSdk
{
	public function getJsApiSignPackage()
	{
		$package = null;

		$jsapi_token = $this->getJsApiToken();

		if ($jsapi_token)
		{
			// ע�� URL һ��Ҫ��̬��ȡ������ hardcode.
			$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
			$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

			$timestamp = time();
			$nonceStr = $this->createNonceStr();

			// ���������˳��Ҫ���� key ֵ ASCII ����������
			$string = "jsapi_ticket=$jsapi_token&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

			$signature = sha1($string);

			$package = array(
			  "appId"     => APP_ID,
			  "timestamp" => $timestamp,
			  "nonceStr"  => $nonceStr,
			  "url"       => $url,
			  "signature" => $signature,
              "debug"     => DEBUG
			);
		}

		return $package;
	}

	// ��ȡ JsApi ƾ��
	private function getJsApiToken()
	{
		$jsapi_token = null;

		$authentication = $this->getAuthentication(JSAPI_TYPE);

        $jsapi_token = $authentication->Value;

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

	// ���� JsApi ƾ��
	private function createJsApiToken()
	{
		$jsapi_token = null;

		$now = time();

		$rsp = $this->wxGetJsApiToken();

		if ($rsp)
		{
			$jsapi_token = $rsp->ticket;

			$expiredTime = $now + $rsp->expires_in;

			$this->setAuthentication(JSAPI_TYPE, $jsapi_token, $expiredTime);
		}

		return $jsapi_token;
	}

	// ����΢�Žӿڻ�ȡ JsApi ƾ��
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

	// ����һ���µ�΢�Žӿ�ƾ������ȡ JsApi ƾ��
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

	// ��ȡ΢�Žӿ�ƾ��
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

	// ����һ��΢�Žӿ�ƾ��
	private function createAccessToken()
	{
		$access_token = null;

		$now = time();

		$rsp = $this->wxGetAccessToken();

		if ($rsp && $rsp->access_token)
		{
			$access_token = $rsp->access_token;

			$expiredTime = $now + $rsp->expires_in;

			$this->setAuthentication(TOKEN_TYPE, $access_token, $expiredTime);
		}

		return $access_token;
	}

	// ����΢�Žӿڻ�ȡƾ��
	private function wxGetAccessToken()
	{
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APP_ID."&secret=".APP_SECRET;

		$rsp = json_decode($this->httpGet($url));

		return $rsp;
	}

	// �������һ���ַ���
	private function createNonceStr($length = 16)
	{
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		$str = "";
		for ($i = 0; $i < $length; $i++) {
			$str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
		}
		return $str;
	}

	// ��ȡ΢����֤��¼����΢�Žӿ�ƾ�ݣ� JsApi ƾ�ݺͿ�ȯ�ӿ�ƾ�ݵ�
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

	// ����΢����֤��¼
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

	// httpGet ΢�Žӿ�
	private function httpGet($url)
	{
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 500);

		// Ϊ��֤��������������΢�ŷ�����֮�����ݴ���İ�ȫ�ԣ�����΢�Žӿڲ���https��ʽ���ã�����ʹ������2�д����ssl��ȫУ�顣
		// ����ڲ�������д����ڴ˴���֤ʧ�ܣ��뵽 http://curl.haxx.se/ca/cacert.pem �����µ�֤���б��ļ���
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);

		curl_setopt($curl, CURLOPT_URL, $url);

		$res = curl_exec($curl);
		curl_close($curl);

		return $res;
	}
}
?>