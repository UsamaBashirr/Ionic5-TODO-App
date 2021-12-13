import { Component, Input, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories =[]
  categorySelectedCategory

  newTaskObj = {}
  itemName
  itemDueDate 
  itemPriority
  itemCategory

  constructor(public modalCtlr:ModalController, public todoServive:TodoService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.categories.push('Job')
    this.categories.push('Personal')
    this.categories.push('Business')
    this.categories.push('Free Lancing')

    this.itemName = this.task.value.itemName
    this.itemDueDate = this.task.value.itemDueDate
    this.itemPriority = this.task.value.itemPriority
    this.categorySelectedCategory = this.task.value.itemCategory
    // console.log(this.task);
    
    
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    if(this.itemName == null || this.itemName == "")
    {
      const alert = await this.alertCtrl.create({header: 'Fail', message: 'Fill up all fields.', buttons: ['Close']});
      await alert.present();
    }
    else
    {
      let uid = this.task.key
      await this.todoServive.updateTask(uid,this.newTaskObj)
      this.dismis()
      const alert = await this.alertCtrl.create({header: 'Success', message: 'Data Updated Successfully.', buttons: ['Close']});
      await alert.present();
    }
  }
}
