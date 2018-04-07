// GameMap Directive
 app.directive("game-map", function() {
   return {
     restrict: "E",
     templateUrl: "/sites/all/modules/custom/team_fitness/modules/tf_minutes/js/templates/calendar.html",
     link: function(scope, element, attrs) {

       scope.setDates = function() {
         scope.month_end = scope.selected_month.clone();
         scope.month_end.date(scope.month_end.daysInMonth());
         scope.calendar_start = scope.selected_month.clone();
         scope.calendar_start.date(1).hour(0).minute(0).second(0);
         scope.calendar_start.startOf('isoWeek');
       }

       scope.buildWeek = function(date) {
         var days = [];
         var day = {};
         for (var i = 0; i < 7; i++) {
           day = {
               name: date.format("dd").substring(0, 1),
               number: date.date(),
               isCurrentMonth: date.month() === scope.selected_month.month(),
               isToday: date.isSame(scope.selected_date, "day"),
               className: 'calendar-day',
               date: date,
               dayKey: date.unix().toString()
           }
           //console.log('build week');
           //console.log('activity for date ' + date.unix());
           //console.log(scope.$parent.daily_history[date.unix()]);
           if (day.isToday) {
             day.className += ' calendar-today';
           }
           
           if (!day.isCurrentMonth) {
             day.className += ' calendar-not-current-month';
           } 
                      
           days.push(day);
           
           date = date.clone();
           date.add(1, "d");
         }
         return days;
       }

       scope.buildMonth = function() {
         scope.weeks = [];
         var done = false; 
         var date = scope.calendar_start.clone();
         var count = 0;
         var days;
         while (!done) {
           days = scope.buildWeek(date);
           scope.weeks.push(days);
           date.add(1, "w");
           done = date.clone().month() > scope.selected_month.month() || date.clone().year() > scope.selected_month.year();
         }
         scope.calendar_end = date.clone();
         // determine if prev and next controls should appear based on challenge dates
         if (scope.start_date != undefined && scope.start_date.unix() < scope.calendar_start.unix()) {
           scope.show_previous = true;
         }
         else {
           scope.show_previous = false;
         }
         
         if (scope.end_date != undefined && scope.end_date.unix() > scope.calendar_end.unix()) {
           scope.show_next = true;
         }
         else {
           scope.show_next = false;
         }
         
       }

       scope.select = function(day) {
         if (scope.$parent[scope.calendarData][day.dayKey] != undefined) {
           var w = scope.$parent[scope.calendarData][day.dayKey].week_index;
           // expand the week for the selected day
           scope.$parent.weeks[w].show_daily_history = true;
           // scroll to daily-history-key
           scope.$parent.scrollTo('daily-history-' + day.dayKey);
         }
       };

       scope.next = function() {
         scope.selected_month.add(1,"M");
         scope.setDates();
         scope.buildMonth();
       };

       scope.previous = function() {
         scope.selected_month.subtract(1,'M');
         //console.log(scope.selected_month);
         scope.setDates();
         scope.buildMonth();
       };

       //console.log(attrs);
       scope.calendarData = attrs.calendarData;
       scope.controls = attrs.controls == undefined?true:attrs.controls == "false"?false:true;
       scope.selected_date = attrs.selectedDate == undefined?moment().hour(0).minute(0).second(0):moment(attrs.selectedDate).hour(0).minute(0).second(0);
       scope.selected_month = attrs.selectedMonth == undefined?scope.selected_date.clone().date(1):moment(attrs.selectedMonth).date(1);
       //console.log(attrs);
       scope.min_date = attrs.minDate;
       scope.max_date = attrs.maxDate;
       scope.setDates();
       //console.log('selected date = ');
       //console.log(scope.selected_date);
       scope.buildMonth();
       scope.day_labels = ['M','T','W','T','F','S','S'];
     }
   };

});
// End Calendar Directive