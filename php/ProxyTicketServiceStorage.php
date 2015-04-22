<?php namespace GlobalTechnology\GlobalProfile {

	use Httpful\Mime;
	use Httpful\Request;

	class ProxyTicketServiceStorage extends \CAS_PGTStorage_AbstractStorage {

		function getStorageType() {
			return 'pgtservice';
		}

		function getStorageInfo() {
			return 'pgtservice';
		}

		function read( $pgt_iou ) {
			$response = Request::post(
				Config::get( 'pgtservice.endpoint' ),
				array(
					'Username' => Config::get( 'pgtservice.username' ),
					'Password' => Config::get( 'pgtservice.password' ),
					'PGTIOU'   => $pgt_iou,
				), Mime::FORM )
				->addHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
				->send();
			$dom      = new \DOMDocument();
			$dom->loadXML( $response->raw_body );
			return $dom->documentElement->textContent;
		}
	}
}
