(function(){

'use strict';

  angular.module('menu.services')
      .service('menuService', ['$location','$mdSidenav','$state', function ($location, $mdSidenav,$state) {

          var sections = [
              {
                  name: 'Pessoa',
                  type: 'toggle',
                  icon: 'home',
                  open: false,
                  pages: [
                      {
                          name: 'Cadastro de pessoa',
                          state: 'app.private.pessoa.inserir',
                          type: 'link'
                      }
                  ]
              }
          ];


          var self = {};

          self.sections = sections;
          self.isFocused = false;
          self.isOpen = true;
          self.openedSection = null;

          self.setIsOpen = function(isOpen){
            self.isOpen = isOpen;
        };

          self.getIsOpen = function(){
            return self.isOpen;
        };

          self.toggleSelectSection = function (section) {
              self.openedSection = (self.openedSection === section ? null : section);
          };

          self.isSectionSelected = function(section) {
              return section.open;
          };

          self.showFullWidth = function(section){
              if( !section ){
                  return (self.isOpen || self.isFocused);
              }
              return self.isSectionSelected(section) && (self.isOpen || self.isFocused);
          };

          self.setFocus = function(){
              self.isFocused = true;
          };

          self.isMenuLocked = function(){
            return $mdSidenav('menu').isLockedOpen();
          };

          self.removeFocus = function(){
            self.isFocused = false;
            return self.isMenuLocked() ? self.isFocused :  $mdSidenav('menu').toggle();
          };

          self.toggleMenu = function(){
              if(!self.isMenuLocked()){
                  $mdSidenav('menu').toggle();
                  self.setIsOpen(true);
              }else {
                  self.isOpen = !self.isOpen;
              }
          };

          self.selectSection = function(section){
              section.open = !section.open;
          };

          self.getItems = function(section){
              return self.sections;
          };

          self.addSection = function(section){
              if(!self.sections[section]){
                  self.sections[section] = [];
              }
              self.sections[section].push(section);
          };

          self.sectionIndice = function(index){
              self.openedSection = index;
          };

          self.sectionCompareToggle = function(index) {
              return self.openedSection == index;
          };

          function sortByHumanName(a, b) {
            return (a.humanName < b.humanName) ? -1 :
              (a.humanName > b.humanName) ? 1 : 0;
          }

          self.sectionPush = function(section){
                sections.push(section);
          };

          self.sectionDecoratingToggle = function(section){
                for(var i in section.pages){
                    if($state.is(section.pages[i].state)){
                        return true;
                    }
                }
          };
          return self;
      }]);

})();
