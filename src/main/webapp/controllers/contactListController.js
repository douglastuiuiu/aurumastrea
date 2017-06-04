var contactListController;

contactListController = function ($scope, $http) {
    $scope.contacts = [];
    $scope.preDeletedContact = {};

    $scope.init = function () {
        $scope.listAllContacts();
    };

    $scope.listAllContacts = function () {
        $http({method: 'GET', url: '/contacts'}).then(
            function success(res) {
                $scope.contacts = res.data;
            },
            function error(res) {
                console.log(res)
                $scope.contacts = [];
            }
        );
    };

    $scope.preDelete = function (contact) {
        $scope.preDeletedContact = contact;
        $('#myModal').modal('show');
    };

    $scope.delete = function () {
        if ($scope.preDeletedContact != null) {
            return $http({method: 'DELETE', url: '/contacts?id='+$scope.preDeletedContact.id});
        }
    };

    $scope.bday = function (c) {
        if (c.birthDay == null || c.birthDay == "") {
            return "";
        } else {
            return c.birthDay + "/" + c.birthMonth + "/" + c.birthYear;
        }
    };
};

angular.module('avaliacandidatos').controller("contactListController", contactListController);