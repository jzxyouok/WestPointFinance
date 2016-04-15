<?php
include('WxSdk.php');

$url = urldecode($_GET["url"]);
$createToken = $_GET["createToken"] == "1";

$sdk = new WxSdk;

$package = $sdk->getJsApiSignPackage($url, $createToken);

if ($package)
	echo json_encode($package);
else
	echo "";
?>
