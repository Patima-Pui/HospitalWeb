import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lineChart: any = [];
  barChart: any = [];
  horizontalBarChart: any = [];
  pieChart: any = [];
  constructor() { }

  ngOnInit(): void {
    this.getLineChart();
    this.getBarChart();
    this.getHorizontalBarChart();
    this.getPieChart();
  }

  public getLineChart(): void {
    // สร้าง object และใช้ชื่อ id lineChart ในการอ้างอิงเพื่อนำมาเเสดงผล
    this.lineChart = new Chart('lineChart', {
      // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
      type: 'line',
      // ข้อมูลภายในแผนภูมิแบบเส้น
      data: {
        // ชื่อของข้อมูลในแนวแกน x
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'],
        // กำหนดค่าข้อมูลภายในแผนภูมิ
        datasets: [{
          label: 'Number of items sold in months',
          data: [9, 7, 3, 5, 2, 10, 15, 61, 19, 3, 1, 9],
          fill: false,
          lineTension: 0.2,
          borderColor: 'blue', // สีของเส้น
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          text: 'Line Chart', // ข้อความที่อยู่ด้านบนของแผนภูมิ
          display: true
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true // แสดง scales ของแผนภูมิเริมที่ 0
          }
        }]
      }
    });
  }

  public getBarChart(): void {
    // สร้าง object และใช้ชื่อ id barChart ในการอ้างอิงเพื่อนำมาเเสดงผล
    this.barChart = new Chart('barChart', {
      // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
      type: 'bar',
      // ข้อมูลภายในแผนภูมิแบบเส้น
      data: {
        // ชื่อของข้อมูลในแนวแกน x
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        // กำหนดค่าข้อมูลภายในแผนภูมิ
        datasets: [{
          label: 'Number of items sold in weeks',
          data: [61, 122, 107, 73],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          text: 'Bar Chart', // ข้อความที่อยู่ด้านบนของแผนภูมิ
          display: true
        }
      }
    });
  }

  public getHorizontalBarChart(): void {
    // สร้าง object และใช้ชื่อ id barChart ในการอ้างอิงเพื่อนำมาเเสดงผล
    this.horizontalBarChart = new Chart('horizontalBarChart', {
      // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
      type: 'horizontalBar',
      // ข้อมูลภายในแผนภูมิแบบเส้น
      data: {
        // ชื่อของข้อมูลในแนวแกน x
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        // กำหนดค่าข้อมูลภายในแผนภูมิ
        datasets: [{
          label: 'Number of items sold in weeks',
          data: [61, 122, 107, 73],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          text: 'Horizontal Bar Chart', // ข้อความที่อยู่ด้านบนของแผนภูมิ
          display: true
        }
      }
    });
  }

  public getPieChart(): void {
    // สร้าง object และใช้ชื่อ id barChart ในการอ้างอิงเพื่อนำมาเเสดงผล
    this.pieChart = new Chart('pieChart', {
      // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
      type: 'pie',
      // ข้อมูลภายในแผนภูมิแบบเส้น
      data: {
        // ชื่อของข้อมูลในแนวแกน x
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        // กำหนดค่าข้อมูลภายในแผนภูมิ
        datasets: [{
          data: [61, 122, 107, 73],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'],
        }]
      },
      options: {
        responsive: true,
        title: {
          text: 'Pie Chart', // ข้อความที่อยู่ด้านบนของแผนภูมิ
          display: true
        }
      }
    });
  }

}
