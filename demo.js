// File name: demo.js

import {CheckToolKit, MyToolkit, ProgressBarToolkit, ScrollbarToolKit, ToggleToolKit} from './mytoolkit.js';
import {textToolKit} from './mytoolkit.js';
import {radioToolKit} from './mytoolkit.js';


// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(20,50);
btn.changeText("Click to grade A")
btn.onclick(function(e){
	console.log(e);
});

//Implement a Text ToolKit  
var tbox= new textToolKit.textBox;
tbox.move(20,30);



//Implement a radio button
var r = []
r.push(["Radiobutton 1", false])
r.push(["Radiobutton 2", false])
r.push(["Radiobutton 3", false])
r.push(["Radiobutton 4", false])
r.push(["Radiobutton 5", true])

let rb1 = new radioToolKit.radioBtns(r,5);
rb1.move(10,5)

//Implment  a checkbox 
var cbox = new CheckToolKit.checkBoxes
cbox.changeText(" Checkbox 1")
cbox.move(20,30)
//implement a progress bar 
var pbar = new ProgressBarToolkit.progressBar
pbar.setIncrement(20)
pbar.move(10,5)
//Implement a scroll bar 
var sbar = new ScrollbarToolKit.scrollBar
sbar.move(0,0)


//Implement a Toggle Button 
var tBtn = new ToggleToolKit.toggleBtn("ON","OFF");
tBtn.move(20,4);


