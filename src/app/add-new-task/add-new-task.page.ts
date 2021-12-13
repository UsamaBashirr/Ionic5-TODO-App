import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =[]
  categorySelectedCategory

  newTaskObj = {}
  itemName
  itemDueDate
  itemPriority
  itemCategory


  constructor(public modalCtlr: ModalController, public todoService:TodoService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.categories.push('Job')
    this.categories.push('Personal')
    this.categories.push('Business')
    this.categories.push('Free Lancing')
  }
  
   async add(){
     this.newTaskObj = ({
      itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory
    })
    console.log(this.newTaskObj);
    if(this.itemName==null || this.itemName=="")
    {
      const alert = await this.alertCtrl.create({header: 'Failed', message: 'All Fields are required.', buttons: ['Close']});
      await alert.present();
    }
    else if(this.itemDueDate==null || this.itemDueDate=="")
    {
      const alert = await this.alertCtrl.create({header: 'Failed', message: 'All Fields are required.', buttons: ['Close']});
      await alert.present();
    }
    else if(this.itemPriority==null || this.itemPriority=="")
    {
      const alert = await this.alertCtrl.create({header: 'Failed', message: 'All Fields are required.', buttons: ['Close']});
      await alert.present();
    }
    else if(this.categorySelectedCategory==null || this.categorySelectedCategory=="")
    {
      const alert = await this.alertCtrl.create({header: 'Failed', message: 'All Fields are required.', buttons: ['Close']});
      await alert.present();
    }
    else
    {
      let uid = this.itemName + this.itemDueDate + this.itemPriority + this.itemCategory;
      await this.todoService.addTask(uid,this.newTaskObj)
      const alert = await this.alertCtrl.create({header: 'Success', message: 'Data has been added.', buttons: ['Close']});
      await alert.present();
      this.dismis()
    }
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
}
