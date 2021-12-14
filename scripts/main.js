//Vue Javascript App to Run Pomodoro Timer Featurue
const pomodoroApp = new Vue({  
  el: '#pomodoroApp',    

  data: { 
    remainingTime: 60 * 25,
    timer: null,
    breakTime: 60*5,
    breakTimer: null,
    name: "LETS FOCUS WITH POMODORO",
    message: "CLICK START TO BEGIN POMODORO SESSION",
  },    

  methods: { 
    handleStart: function(){
      this.timer = setInterval(() => this.decreaseTimer(), 1000);
      this.message = "FOCUS TIME!";
    },

    decreaseTimer: function() {
      if (this.remainingTime >= 1) {
        this.remainingTime--;
      } else {
        this.remainingTime = 0;
        this.handleStop();
      }
    },

    handleStop: function() {
      clearInterval(this.timer);
    
      this.timer = null;
      clearInterval(this.breakTimer);
      this.breakTimer = null;
      this.message="TIMER PAUSED";
    },

    handleReset: function() {
      this.remainingTime = 60 * 25;
      clearInterval(this.timer);
      this.timer = null;
      this.message="TIMER RESET";

      this.breakTime = 60 * 5;
      clearInterval(this.breakTimer);
      this.breakTimer = null;
    },

    handleBreak: function(){
      this.breakTimer = setInterval(() => this.decreaseBreakTimer(), 1000);
      this.message = "BREAK TIME!";
    },

    decreaseBreakTimer: function() {
      if (this.breakTime >= 1) {
        this.breakTime--;
      } else {
        this.breakTime = 0;
        this.handleBreakStop();
      }
    },

    handleBreakStop: function() {
      clearInterval(this.breakTimer);
      this.breakTimer = null;
    },
  },   

  computed: {
    minutes: function() {
      const minutes = Math.floor(this.remainingTime/60);
      if (minutes>10) return minutes
      else return '0' + minutes;
    },

    seconds: function() {
        const seconds = this.remainingTime - (this.minutes * 60);
        if (seconds>10) return seconds
        else return '0' + seconds;
    },

    b_minutes: function() {
      const b_minutes = Math.floor(this.breakTime/60);
      if (b_minutes>10) return b_minutes
      else return '0' + b_minutes;
    },

    b_seconds: function() {
        const b_seconds = this.breakTime - (this.b_minutes * 60);
        if (b_seconds>10) return b_seconds
        else return '0' + b_seconds;
    }
  },

})

//Javascript App for menuList
var menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

function togglemenu() {
    if(menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "130px"
    } else {
        menuList.style.maxHeight = "0px";
    }
}

//Vue Javascript App to Run To Do ListFeaturue
const app = new Vue ({
  el: '#toDoApp',

  data: {
          task: "",
          editedTask: null,
          availableStatus: ["NOT STARTED", "IN PROGRESS", "COMPLETED"],
        
          tasks: [
                  {
                      name: 'My first task',
                      status: 'IN PROGRESS'
                  },
                  {
                      name: 'My new second task',
                      status: 'NOT STARTED'          
                  }
          ]
  },

  methods: {
      submitTask: function() {
        if(this.task.length === 0){
          var error = document.getElementById("error")
          error.textContent = "Please enter a task"
          error.style.color = "red"
        }
        
        if (this.editedTask === null){
          this.tasks.push({
            name: this.task,
            status: "NOT STARTED"
          });
        } else {
          this.tasks[this.editedTask].name= this.task;
          this.editedTask = null;
        }
  
        this.task = "";
      },
  
      deleteTask: function(index) {
        this.tasks.splice(index, 1);
      },
  
      editTask: function(index) {
        this.task = this.tasks[index].name;
        this.editedTask = index;
      },
  
      changeStatus: function(index) {
        let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
        if(++newIndex > 2) newIndex = 0;
        this.tasks[index].status = this.availableStatus[newIndex];
      },
  },
});