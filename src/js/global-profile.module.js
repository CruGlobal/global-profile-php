(function () {
	'use strict';

	angular.module( 'globalProfile', [
		// Dependencies
		'ui.router',
		'globalProfile.common.settingsService',
		'globalProfile.api.measurements',
		'angular-growl',

		// States
		'globalProfile.states.selectMinistry',
		'globalProfile.states.profile.edit',
		'globalProfile.states.admin.add',
		'globalProfile.states.admin.edit',
		'globalProfile.states.admin.import'
	] );
})();
