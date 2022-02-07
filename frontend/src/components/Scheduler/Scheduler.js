import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import './Scheduler.css';

const scheduler = window.scheduler;

class Scheduler extends Component {
    componentDidUpdate() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];

        const { events } = this.props;
        scheduler.config.drag_move = false;
        scheduler.config.drag_create = false;
        scheduler.config.dblclick_create = false;
        scheduler.attachEvent("onDblClick", function (id, e){
            return false;
        })
        scheduler.attachEvent("onViewChange", function (new_mode, new_date){
            //switch 
            var headerDiv = document.querySelector("div.dhx_cal_date").style;
            if (new_date.getMonth() === 5 )
                headerDiv.color = "red"; //backgroundColor
            else
                headerDiv.color = "";
            });

        scheduler.init(this.schedulerContainer, new Date(2021, 12, 1), "month");
        scheduler.clearAll();
        scheduler.parse(events);
    }

    render() {
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}

export default Scheduler;
