var contactListController;

contactListController = function ($scope, $http, $state, $rootScope) {
    $scope.contacts = [];
    $scope.preDeletedContact = {};
    $scope.search = '';

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
            $http({
                method: 'DELETE',
                url: '/contacts?id='+$scope.preDeletedContact.id
            }).then(
                function success(res) {
                    $('#myModal').modal('toggle');
                    $scope.listAllContacts();
                },
                function error(res) {
                    console.log(res.message);
                    alert(res.message);
                }
            );

        }
    };

    $scope.bday = function (c) {
        if (c.birthDay == null || c.birthDay == "") {
            return "";
        } else {
            return c.birthDay + "/" + c.birthMonth + "/" + c.birthYear;
        }
    };

    $scope.edit = function (contact) {
        $rootScope.contact = contact;
        $state.go('main.addeditcontact');
    };

    $scope.sensitiveSearch = function(contact) {
        if ($scope.search) {
            return contact.name == $scope.search ||
                contact.emails[0] == $scope.search ||
                contact.cpf == $scope.search;
        }
        return true;
    };

    $scope.listAllContacts();
};

angular.module('avaliacandidatos').controller("contactListController", contactListController);