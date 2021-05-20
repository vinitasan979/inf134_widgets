// File name: mytoolkit.js

import { SVG } from './svg.min.js';


/** Function to create button widget  */ 
var MyToolkit = (function () {
    /**
     */
    var Button = function () {
        var draw = SVG().addTo('body').size('60%', '100%');
        var nested = draw.group()
        var rect = nested.rect(150, 50).fill('white').stroke({ color: 'black', width: 2 })
        var textbx = nested.text("click me")
        textbx.x(rect.x() + 20) //position text in the middle 
        textbx.y(rect.y() + (rect.height() / 4))
        /**code to change Text Font  */
        textbx.font({
            family: 'Helvetica'


        })  
        var clickEvent = null

        rect.mouseover(function () { // when mouse moves over the button the border turns purple 
            rect.stroke({ color: 'purple', width: 4 })
        })
        rect.mouseout(function () { //when mouse out of the button the border goes back to normal 
            rect.stroke({ color: 'black', width: 2 })
        })
        
        rect.click(function (event) { // to show the user the button is clicked, it turns pink 
            this.fill({ color: 'pink' })
            if (clickEvent != null)
                clickEvent(event)
        })
        return {
            /**
             * @param  {Number} x - x coord
             * @param  {Number} y - y coord 
             */
            /** allows user to move widgets specfic position of button on main window */
            move: function (x, y) {
                //
                nested.move(x, y) 

            },
            /**
             * @param  {String} a - new text value
             */
            /** allows user to customize button text */
            changeText: function (a) {
                
                var s = String(a)
                textbx.text(s);
                var l = textbx.length()
                rect.width(l + 30)
                textbx.x(rect.x() + 10) //position text in the middle 



            },
            onclick: function (eventHandler) {
                clickEvent = eventHandler
            }
        }
    }


    return { Button }

}());

/** Text Box Code*/
var textToolKit = (function () {
    var textBox = function () {
        var draw1 = SVG().addTo('body').size('100%', '100%')
        var nested = draw1.nested()
        var words = "" //inital string is empty 
        var group = nested.group()
        var box = group.rect(300, 40).fill('white').stroke({ width: '1', color: 'black' })
        var bwidth = box.width
        var line = group.line(0, 90, 0, 0) //caret sybmol 
        var textb = group.text(" ")

        line.insertAfter(box) //to ensure that caret is placed infront of the main box and is visible 
        textb.insertAfter(box)
        line.stroke({ color: 'black', width: 10, linecap: 'round', opacity: "0" }).move(6, 3)
        line.height(20)


        group.mouseover(function () {
            //if the user moves over any part of the overal text box the caret is visible 
            line.stroke({ color: 'black', width: 3, linecap: 'round', opacity: "7" })
        })
        group.mouseout(function () {
            line.stroke({ color: 'black', width: 3, linecap: 'round', opacity: "0" })
            console.log("mouse out")
        })

        // allows user to type in the box 

        SVG.on(window, 'keyup', (event) => {
            var pressed = event.key
            console.log("key up event " + pressed)
            //remove chars when user uses the backspace button 
            if (pressed == "Backspace") {
                words = words.slice(0, -1)
                textb.text(words)

            } //ensure text fits in the box 
            else if (pressed.length == 1 & textb.length() < box.width()) {

                words += pressed
                textb.text(words)
            }
            var b = textb.length()
            line.x(b + 1)




        })


        return {
            /**
             * @param  {Number} x - c coordinate
             * @param  {Number} y - y coordinate
             */

            
            /** allows user to move widgets to specfic position of button on main window */

            move: function (x, y) {

                nested.move(x, y)

            }
        }
    }
    return { textBox }
}());

/** Function to implement Radio Buttons */
var radioToolKit = (function () {
    /**
     * @param  {} bArray - array of radio buttons with names,states
     * @param  {Number} n - number of items in bArray
     */
    var radioBtns = function (bArray, n) {
        var y = 30
        var legal = true //not more than one button is checked 
        var btnArray = new Array(); //array of radio buttons 
        var draw2 = SVG().addTo('body').size('100%', '100%')
        var group = draw2.group()
        var chosenBtn = draw2.circle(19).fill('pink').move(3, 33) // smaller button to show selected radio button 
        var hoverbtn = draw2.circle(25).fill('white').stroke({ color: "purple", width: 5 }).y(30) //larger button to outline hovered radio button 
        //inital hide both till user makes an action 
        chosenBtn.hide()
        hoverbtn.hide()

        for (var i = 0; i < n; i++) {
            //create radio buttons 
            var button = group.circle(25).fill('white').stroke({ color: "black", width: 2 }).y(y)

            if (bArray[i][1] == true & legal == true) {

                chosenBtn.show()
                chosenBtn.move(button.x() + 3, button.y() + 3);
                legal = false;
            }
            //add text to the right
            var textr = group.text(bArray[i][0]).move(30, y)
            y = y + 30
            btnArray.push(button)


        }
        group.add(hoverbtn)
        group.add(chosenBtn)

        // click listener to add smaller button to chosen on 
        btnArray.map(e => e.node.addEventListener("click", function () {
            chosenBtn.show()
            chosenBtn.move(e.x() + 3, e.y() + 3);

        }));

        // hover
        btnArray.map(e => e.node.addEventListener("mouseover", function () {
            hoverbtn.show()
            hoverbtn.move(e.x(), e.y());

        }));

        //no longer  hovering
        btnArray.map(e => e.node.addEventListener("mouseout", function () {
            hoverbtn.hide()

        }));

        return {
            /**
             * @param  {Number} x - x coordinate
             * @param  {Number} y - y coordinate
             */
             /** allows user to move widgets specfic position of button on main window */

            move: function (x, y) {

                group.move(x, y)

            }
        }









    }
    return { radioBtns }
}());

/** Function to implement checkboxes */
var CheckToolKit = (function () {
    var checkBoxes = function () {
        var draw3 = SVG().addTo('body').size('100%', '100%')
        var group = draw3.group()
        var box = group.rect(30, 30).fill('white').stroke({ color: "black", width: 2 })
        var text = group.text("Custom Text").x(35)
        var innerbox = group.rect(23, 23).fill('pink').move(3.5, 3) //inner box shows only when checked 
        innerbox.hide()
        var check = false //intial status 

        box.mouseover(function () { //highlights border when hovered over 
            box.stroke({ color: "purple", width: 5 })
        })
        box.mouseout(function () {
            box.stroke({ color: "black", width: 2 })
        })

        //when box is clicked unchecked button because checked and vice versa by adding/removing the inner button 

        box.click(function () {
            if (this.check == true) {
                innerbox.hide()
                check = false

            }
            else {
                innerbox.show()
                check = true
            }
        })

        innerbox.click(function () {
            if (check == true) {
                innerbox.hide()
                check = false
            }

            else {
                innerbox.show()
                check = true
            }
        })


        return {
            onclick: function (eventHandler) {
                clickEvent = eventHandler
            },
            /**
             * @param  {String} a - new text value
             */
            /** allows user to customize button text */

            changeText: function (a) {
                var s = String(a)
                text.text(s);

            },
            /**
             * @param  {Number} x - x coordinate
             * @param  {Number} y - y coordinate 
             */

            /** allows user to move widgets specfic position of button on main window */

            move: function (x, y) {

                group.move(x, y)

            }
        }



    }
    return { checkBoxes }
}());

/** Function to implement progress bar */

var ProgressBarToolkit = (function () {

    var progressBar = function () {
        var draw4 = SVG().addTo('body').size('100%', '100%')
        var group = draw4.group()
        var outerBox = group.rect(250, 20).fill('white').stroke({ color: "black" })
        var innerBox = group.rect(0, 20).fill('purple') //inital state is 0 till user specfies 
        var outWidth = 250
        var inWidth = 50
        var inc = 0 //inital state 

        return {
            /**
             * @param  {Number} a - new width of box
             */
            changeOuterWidth: function (a) {
                outerBox.width(a);
                outWidth = a
            },
            /**
             * @param  {Number} a - new increment value
             */
            setIncrement: function (a) {
                // if the value is greater than 100 or less than zero display an error 
                if (a > 100 || a < 0) {
                    console.log("Value out of bounds")
                }
                //increment width of progress bar 
                inc = a
                inWidth = (outWidth * a) / 100
                innerBox.width(inWidth)

            },
            getIncrement: function () {
                return inc

            },
            /**
             * @param  {Number} x -x coordinate
             * @param  {Number} y - y coordinate
             */

            /** allows user to move widgets specfic position of button on main window */

            move: function (x, y) {

                group.move(x, y)

            }
        }


    }
    return { progressBar }
}());

/** Function to implement scrollbar */

var ScrollbarToolKit = (function () {
    var scrollBar = function () {
        var draw5 = SVG().addTo('body').size('100%', '100%')
        var group = draw5.group()
        var bar = group.rect(10, 200).fill('white').stroke({ color: "black" })
        var scroller = group.rect(10, 50).fill("purple").stroke({ color: "black" }).y(bar.height() / 2)
        var curr = scroller.y() //current position of scroller 

        //the top button with sumbol 
        var topGrp = group.group()
        var topBtn = topGrp.rect(10, 10).fill("grey")
        var topTri = topGrp.polyline('0,6 6,0 10,6').fill('black').stroke({ width: 1 }).y(topBtn.y() + 2)

        //bottom button with sybmol 
        var btmGrp = group.group()
        var bottomBtn = btmGrp.rect(10, 10).fill("grey").y(bar.height() - 10)
        var bottomTri = btmGrp.polyline('0,0 5,6 10,0').fill('black').stroke({ width: 1 }).y(bar.height() - 7)

        //move scroll bar up using top button if it is within bounds 
        topGrp.click(function (event) {
            if ((curr - 10) > (topBtn.y() + 10)) {

                scroller.y(curr - 10)
            }
            else {
                scroller.y(topBtn.y() + 11)

            }
            curr = scroller.y()

        })

        //move scroll bar down while using bottom button if it is within bounds 
        btmGrp.click(function (event) {
            if (curr + 10 < bottomBtn.y()) {
                scroller.y(curr + 10)

            }
            else {
                scroller.y(bottomBtn.y() - 1)

            }
            curr = scroller.y()

        })

        //move scroll to position chosen by user if it is within bounds of the scrollbar 
        bar.click(function (event) {
            var pos = event.clientY
            if (pos + scroller.height() <= topBtn.y() + 10) {
                scroller.y(topBtn.y() + 11)
            }
            else if (pos + scroller.height() >= bottomBtn.y()) {
                scroller.y(bottomBtn.y() - 1)
            }
            else {
                scroller.y(event.clientY)
            }
        })

        scroller.click(function (event) {
            var pos = event.clientY
            if (pos + scroller.height() <= topBtn.y() + 10) {
                scroller.y(topBtn.y() + 11)
            }
            else if (pos + scroller.height() >= bottomBtn.y()) {
                scroller.y(bottomBtn.y() - 1)
            }
            else {
                scroller.y(event.clientY)
            }
        })
        return {
            /**
             * @param  {Number} x - x coordinate
             * @param  {Number} y - y coordinate 
             */

            /** allows user to move widgets specfic position of button on main window */

            move: function (x, y) {

                group.move(x, y)

            }
        }

    }
    return { scrollBar }

}());

/** Function to implement Toggle Button  */

var ToggleToolKit = (function () {
    /**
     * @param  {String} state1
     * @param  {String} state2
     */
    var toggleBtn = function (state1, state2) {
        var draw6 = SVG().addTo('body').size('100%', '100%')
        var group = draw6.group()
        var outer = group.rect(80, 30).fill("purple").stroke({ color: "black", width: 1 }) //main box 
        var inner = group.rect(30, 30).fill("white").stroke({ color: "black", width: 1 }) //toggle switch 
        var text = group.text(state1).x(outer.width() + 8)
        var initPos = inner.x() //inital  position of toggle
        var state = 1 //varible to know current state of toggle 

        inner.click(function (event) {
            if (state == 1) {
                //switch to state 2 
                text.text(state2)
                inner.x(outer.width() - inner.width())
                outer.fill("pink")
                state = 2 //update state
            }
            else if (state == 2) {
                //switch state back to 1
                text.text(state1)
                inner.x(initPos)
                outer.fill("purple")
                state = 1

            }

        })

        return {
            /**
             * @param  {Number} x - x coordinate 
             * @param  {Number} y - y coordinate 
             */

        /** allows user to move widgets specfic position of button on main window */

            move: function (x, y) {

                draw6.move(x, y)

            }
        }

    }
    return { toggleBtn }

}());

export { MyToolkit }
export { textToolKit }
export { radioToolKit }
export { CheckToolKit }
export { ProgressBarToolkit }
export { ScrollbarToolKit }
export { ToggleToolKit }