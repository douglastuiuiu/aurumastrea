var contactAddEditController;

contactAddEditController = function ($scope, $http, $state, $rootScope) {
    if(!!$rootScope.contact){
        $scope.contact = $rootScope.contact;
    }else{
        $scope.contact = {};
        $scope.contact.emails = [''];
        $scope.contact.phones = [''];
    }
    $scope.submitted = false;

    $scope.save = function () {
        $scope.submitted = true;
        if ($scope.contact.name != null && $scope.contact.name != "") {
            $http({
                method: 'POST',
                url: '/contacts',
                data: JSON.stringify($scope.contact),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function success(res) {
                    $state.go('main.contacts')
                },
                function error(res) {
                    console.log(res.message);
                    alert(res.message);
                }
            );
        }
    };

    $scope.addMorePhones = function () {
        $scope.contact.phones.push('');
    };

    $scope.addMoreEmails = function () {
        $scope.contact.emails.push('');
    };

    $scope.deletePhone = function (index) {
        if (index > -1) {
            $scope.contact.phones.splice(index, 1);
        }

        if ($scope.contact.phones.length < 1) {
            $scope.addMorePhones();
        }
    };

    $scope.deleteEmail = function (index) {
        if (index > -1) {
            $scope.contact.emails.splice(index, 1);
        }

        if ($scope.contact.emails.length < 1) {
            $scope.addMoreEmails();
        }
    };

};

angular.module('avaliacandidatos').controller("contactAddEditController", contactAddEditController);