import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

import { Chat } from '../../../models/chat';
import { ComponentShareService } from '../../../services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { Subscription } from 'rxjs';
import { UserIdTranferService } from '@app/services/user-tranfer.service';
import { UserService } from '@app/services/user/user.service';

class FileSpinnet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss']
})
export class ViewComponent implements OnInit {
  imagePreview: any;
  showAboutRight: boolean = true;
  responseLastMsg: any; // Nhận về tin nhắn từ stringee
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;
  convIdFromDataTranfer: any; // Nhận convId từ contact list
  userShareService: any; // Nhan userId tu contact list
  userInfo: any; // Thông tin user lấy theo id

  constructor(
    private route: ActivatedRoute,
    private stringeeService: StringeeService,
    private componentShareService: ComponentShareService,
    private userIdTranfer: UserIdTranferService,
  ) {
    route.params.subscribe(val => {
      this.getParam();
      this.getUserIdTranfer();
      this.getConvesationLast(this.convIdFromDataTranfer);
      this.tranferConversationById();
    });
  }
  ngOnInit(): void { }

  /* #region  TRANFER SERVICE  */
  // Nhận convId được đẩy từ conversation list 
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => { this.convIdFromDataTranfer = convId });
  }
  // Tranfer id cho contact list để active conversation
  tranferConversationById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.componentShareService.setConversationId(id);
  }
  // Nhận user từ conversation list chuyển sang
  getUserIdTranfer() {
    this.userIdTranfer.getUser$.subscribe(user => { this.userShareService = user });
  }

  /* #region  XỬ LÝ STRINGEE  */
  //    Lấy cuộc trò chuyện cuối cùng để hiển thị ở phần content message 
  getConvesationLast(convId) {
    this.stringeeService.stringeeServiceMessage(convId, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
      console.log(msgs)
    });
  }
  //    Gửi tin nhắn 
  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    this.stringeeService.sendTextMessage(this.convIdFromDataTranfer, sendForm.value.message);
    sendForm.reset();
  }
  //    Gửi file
  selectedFile: FileSpinnet;
  processFile(imageInput: any) {
    
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
    
      this.selectedFile = new FileSpinnet(event.target.result, file);
      // let message: any = {
      //   id: this.chat.listMesseage.length + 1,
      //   content: this.selectedFile.src,
      //   time: Date(),
      //   type: "image",
      //   fromMe: false,
      // };
      // this.chat.listMesseage.push(message)
      let filePath = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUXGBYYGBgVFxgXGBgXFxUXFxUXFxgYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUHAQj/xABDEAABAwIEAggEBAQEBAcBAAABAAIRAyEEBRIxQVEGEyIyYXGBkaGxwfAUQlLRByNy4TNigvEkorLCFUNjc4Oz0hb/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EACIRAQEAAgICAgMBAQAAAAAAAAABAhEhMRJBA1ETImEyBP/aAAwDAQACEQMRAD8AuMyijjcJjsWQ41aJqCmQ4gEU6Tand47uV3LegeENPAmo1+qtT1VYeR2uo6yAPy3IUf8ADdw/CaHd2rjXUneVTBOA+OlFuHqh1ajp2ZXxVMf/ABUOr+bCknPIuZZZWyt7gx2GxPaeA1wqiQ1xEahMSJi28TxhG2QdEfw1aqxpLmh9i6J0wCJjjeEOdDOqp4B2Idh6NWoMVTY01WzpBZTIg+BMrqGV1S9ped3GTCGMG8EKHViW+q9o5i1ztPFXIVWlgGh+vinLv7QZzQ6xunYLn2W1HU8YabzYER5EfuumY1hLDG4XGulONc3E6m2cBB9yly4GOv4DE6iQNgrqGP4fPc7DB7+879yihNC1FiXw0qnk9GAXcyrmIp6hCfTYGgAcFm9HJJJLAp5k4gSChfM8f2THjfyuUU5kOwgbNmdl3mY8QB+8exS26VwQ9GcK17y4jjP7BGjcJI2Qf0aaadyezvcRc8BzHitTMOkobIbbxQlmhsqbMMrEyIA8VWdl1IXe4epj4C6Fa+e1a74DyAPW/gAZJ91dw9GuIhjTPAwHe5H1SXObPMeG07KKZMscfp8VKzLSLqnhseBZ+ukfEyDw9Vt4XEHjBHBzb+luK0yjWWMjFUiAsPFC6M8fhtTdbRcC4HzH7IJxgOo8lqEqmK7g6xIRRklPVcmVg4fA6rnZEOWUTTHGEMWohotGlNoASVlVc3azn5Kxk73VDrIgHZOTTUhep8JLFcHynOadJml9N7jr1gtqOaAYYAYDh2hD779oXsrI6R0YIFOuDDoLa72kPc0h9Szu8SZPPZDVVeMCwjjo3i6FWrobRc2mIdo1u0agAA4t1bzeeQA8T13JWRT2i64x0Ga1tZrnHe0ffku4YPuBNiF6TpJEpJiEgHp/0eaYrtEGb+IR+szpHS1UHjwPyQs3BjP6Eua2gGojQH0Lxd99kdhy06HLt7KSysRjP5ulvJajTYIhp6kkmVqoa0ucQALknYLAVZgcCCh/O2UGMOtsWFjF4M8D93XuY9JdIOhsDm7c+TR9Vz/P+k4cTqIJ8QltVxxs7PzTOxHZIA2a3w/2+iFcZmpfYHjx3VLG1jVJ0gTzFhfwmSqQwFVx7LXHxgpNfZ7RdlWMpMa0Ngkne5JPDSAZRPlzy7aAeW5nlBBuuYU8FiGX6mpPPQSPkrH/AI7iGd8uA5OBaPayS4X0by+3VNQmKjWxxjh5iZ+KmoYd9N00nBwsCw7ETw++J3QHlHTF1g4cf1cDvvePXkjjLMxpvA2HMSSwjl+phvvcKerLybe4I8BWFSHs7Lh32nceEc7LH6S5aBFRg7J3i8TcT6mPIjktPDM0nWJ4B02PgDztEO8FoY7DirTcw/mBjz4Qr48xG8UF5e0SGnz8x4LdFOVjYeg4ubO7ZuOIP2fuUYYLD6Wid0cWyug/mOUlzdvgtXJcMWUWtO8f7LSITYR0S5bNhJepLA+aHJMUYcrGHZJCFM18ua8AOG42XYejOc62NnigXJcM00xI2C0aVbqttlseB0Pn42ajWgrTQL0exhfVv4I6TwmRKpmo/lO8lbVTND/LKIRy7o/g61Ko5wHZdw9bLo1F50DfZZ+Fw21rLWgBCTR6pYXD9snx+/ot0BY4rta6ZVhucU/EffgtsLLWg4xc7IH6R55rJAP8tuw5kfmP0H72vdJc/HVljDE7nw4rmGd5sT2Wnf4IWmxx1zTc9zdzyWtfHO8n2CyaOADjJdI4wNPxufRQU3S6BsONvv1/dWaOKv4bD1Sm3sR5NgWtiA36/ufVENCg3khTK8SQ654c+SKcNVkSkVi41gTjBsQCPG6ja9OYVjMzHdEsJWv1Ypu50ux/yjsn2WUckxOEOqm41qY4fnAm4jiPL2RK7NGs4SqlXpUwGCyP2Ws3OS6bHRLNmVGtuP0lpm3+XyPLhuiplgI2kcduEen780FZc6jWIqsGip+oWJvxH5tuKIKGYiDTqQHchAkcCPKwPLyWx/VPPHay7DtD7Wvt5/3+i0yFTxEWfziVbY6Qqo14QmkKQpjlgNhJRdeElhfM7ArNEwQVDSF1bZRSWnFWS5iAACt/LC2pVjkJWJk+BaALCUXYLDNpua4Dz9VpBbuTYZoeLfYRChulimse0+KJAVWEyJZ+dvhg5lwAWgsHPCXYigybTqPpK1LGvhaQDRZZeaVINlrYmrpFhJNgPH9kMZ+8NME6ncT/AG4IU+E5U8RiRxd8d/RZuMxwAMG+0n5KlicQLn7+9/dZtev3Qf1fL+5SKoekWY6WgTc7/MoP63VLnHf7gK3n+K1VDyBj2WeDsjCW8pw+G2sT8AlTq8fQKrWrJwMgD7lEGphsWbX4j7+KOsu7oXOMICXAePxOy6Tgm6WgKeXC3xrgK8rOOmBuvU0pTqzcI2L3TKmWUSCSQ0ji4wPUmwUeYVHtHYaXOOwmB6ngqdLL9Y/nGXEWgSGHeWAi1/M+KE/rX+LuA7J7JBHMGQfUK/nNOo9rKtIEvpHtNG7mcdIFyRyF1WyzLiwmCS2ZEt0ESSSIFi3ktdjCEZGvLdwGMFbCNeNxuOII3H3yUFHMi3iqVLMHiQTIMTPGNr7qOthi8TTN/wBJ3/0nj5GFSXhG4aE+DxzXjxTsVU7JhCWXYktkOkHxsQeRRHRqjQCmlTuOkd16o/xSSDacKwGEmCreLpxEKPBVLBXMO0OqsB4ub81MRr0cypzmNJF4RK7L3NbcLYyXDBtMWuVfc0GxVpC3IDZjTkW3CJsgx4qUm8wIKx8/wTmanDbdZfRTHaQ4g8Sh7NeY6ASg/GZkHZhTaPytM+6tY/OXaChfKsveK/XOJkk+xWtLMR5XxYu/gLD2/efYIAzzMS95v3j7N/2C2M2xZDGtB3MnyA/uUGYrETUjzE+QuPihapJo7E1beUH3/sFlVsR3f6SfcypMTWs/wj/uWIMTLW/0ke0INaz8Y+XHzJ+KiDkqxXhsExTCZKnadvBQNUuyzNKg8NqU3jbj5gx+yPsFiw/ZczZW5/f3ZbWUZt1ZAJsp5YqYZadEpqZoCzcHiw5oINlaFVT2tpda1qnpaQszrk5lVHybTb1AqDEiyp08QpTVlN5bL46VS6+6rY/NW0gLxyuvMyp1AJYJ8LfVDz+jT679VQ3MAB3db4WN/NLbzo8nsX4bMhXZqI7TSGk8wQYny0/FTsx2kaSruQ5Bow7Wy2e0THOePjAA9FRzXAuYbi3NUx3rlz5XHysjz/xAJLG0pIgFGYLR2YUDGFtZl/zN+a1cwrNNR1xErExWJmo2OBt7oaK77ktXVSCvoV6KZsDTbJ4BFDHg3BlUlJYbiKIe0ghcmz5pwmIOnuvkx4jf5rrVSoAJlcl/iRiQ6oyOBN/NDPocVzIcaa9WHRAExzKN8FQBkRwK5D0dxjm1m6eIM+S6PkmcB1UMvshheOTUO5xiZqHwB+qEMbjh1zBwFj5uc6T7Fvst/POzWqNm4keUIGxNT+YT5Iez1fxteC7xb8if/wBLGY+3kfgQreJqar/cFZ0wjC0qn1TCUiUosmB7T5ei06GU1HRDTB5gj5om6LZcGUWvFnvAcXReD3WgnYRBWvVfiGVOyQ9kSdfDn2h9ZXPn8vPDox+HjkGDo0/81lHWyKo24II+KN6ePZVbqAjgQd2nkV67Dqf5ctn/ABYhrIMY+mdD9uHgimlXlUa+CaeA81Nh2wIS5ZbuzTHUWw9T03Kq0KxTWlZMCpmPUATiU8pVs1VRzDNWUW6jE8AvS4rGo5S7WalVweZsOAHK6bbSTfK70Z6a1TXbTdBa97R5SYt/ddGzeiHUzKAcLjKjD2KbDG0ifouhUnF9JpcILmAkciQCQq/HdxL/AKNblk0CPwhSRD+Eakm0ltwj8UTun4Vup4HiqbhBhbnRKgH178BPqgUZZS9zWgaSR8VsUcweLSR5q5lmWWV2vljeSMhtqP4l5FyhLpLhw4EosqUwLIfzmnYoZdCFcnOiqHHaCD6j9wiPLcaKddjybbe6FS+5C2crpyL3SYX0Cz0/bFfrW92oOH6og/L4FAOKN5XR8Vl3XUHUZlzbsJ58B6iy5xiqTmkscIIVG9IqdTgVDWZB+STjzUkyLoggCbMK5gsE6q/Q2J5nYDmUbZH0TpNE1R1hPKzf7rWyGmNrzobjhVoBk9umNJH+Ud0j0t6IjLS+mWHf5q5gsuo0+5Sa08wADw99h7LQYxv6VK4Ony45Cdbo+57XNaHAuIJiQRGxCkpYHEU7V3MLYhpa1wdI/VNijMY4NtpTDmNOrqYSCRuDBIQ/HiXzy+gY4pgUnSVoww1mTTJsQCYJ4GEPDpLRPEjzaVC/Hl9KeeP2IWuUzHrBo51SdtUb6mD8VoU8SEvM7bcvTSa9O1rPbiFM2uEfJtLYengyqgrBObiAmmQaaOFAm6MMBiQaVt2iP2QF+KA4rW6MZgTiGs4EOnyDSfoFbDOb0j8uG41evPIpLd/Dt5JK7n2+dc2w8Ola/QhgD3O429lFm9ObqLI6xpukKWzadqyauNKnxVYXQhl2bdnkpsRmUiypttLOKqiTCxs1EtK9GIlV8aS5tktpwRiTD0QZJUbpuVhZk2Hq3lLO0p48UoryesetM2BsE7pz0M65nX4cDW25aPzDc+oufdWMHRm4RJgcbAhytAr59q0SCWuBDgYIO4IVrLMrfWdpaLDczC670iybCYl0vZ2iI1NsbbTzWHg+j1GhLqbnFxsQ4zEcW22990uVsPjNs/KMlZTp2Fz3pttzRHhzEACIVdzhBIseKqsxoa6Z+fyUt6dEnDap1nRcReFIHknfZUBnDSY1AT9gqaniod93TSxtLxrjYGD48VWoaWuLmNEvPbGxcQIB8SAn16LXXbv8lFrAjUPVbeqXW4s16LKrHU6gDmOHoRuCFyXpT0bqYWoYBdSJJa7kLWPvC60HtiNjwvvPC690sqtLHiR4p5dFyx3HBZVjD417O68j1t7LX6UdF6mEM70yTDuVzpB8Yj4ofTcVHptUM/qDvQfgVcp9IfNDKSS/FjfRp8mUFBz9IdIUMSrOX4sUqgeadOpH5ardTD5tkSh+HEfy5DLJjiMWYoU3vExIHZHm89kepXUeiHRo4YGpVIdVcIgXDG8geJNpPp4nO6G9M6WKYGMhlRrRqpbAc+r5tHJFQxJ3IRx+LHG7Jn8mWU0twkq/4scikqJacSzSnuszDvgrfz2hpCGGvgqFnKtGWCuBC2KWHtdC+R17+CLMM/VYAk8gJPsFTFohq0QFXeLK3jX6eyQQRuCII8wVnYhxhCmDObN7alwTNlVzGpL1ewZFpUvZRlk4sFq1WRdYWW17LSfiLRKvKKjmmJa0SeCFKPSF3XA/kMNI8ES5hRDgfFA+LwnVVL3G4/ZJnaA3qYMB0+0qN1EG8X4/ft8U/LMSKtEQZLR2rexE3KdSqDa3olsdOOW4q1cEDwCpim9psSBwk2/2W4APs3/uoKjAd58rJbDyoMFmV+1Z23g775K9WbIke3IrOrYXlCkwNcjsOB8J+S38rWe4t0aoPZcPRaD6YI1t3G4+qy6tO8+ys4SsTt9nz4I431S2e4nzHBtxVB1N3EWO8HgQuK5tl7qFV9J4ILSYniJMHyK7LQrGSYLSD2hw/qaeLT8PCQsvptkbcTRNQCKrASDzA3afiq431Us8d8xyJJerxOiSSS9WZs9DBUOOwzaXfNVvtPbPo3UV9JvpWXLf4N5AGA42oO08FlIcmT23+ZIgeAP6l1grEyrJSV/8OElh24x0mxYiBuhincolzrLdUkWd80MUxDoUadu5dAiZi0wYMcYMGPZEFTMnEaWwynwY3j4uJu8+J9I2Q9gGq8SlxoyCPH1tVDCvddxbVYTzFOpDfYOhR4nBO0POpuum0PdTvqDCQCTaJEgkbifRWXkUsPhqrxanSLmA7Oq16jnUx4hrW6yPADisvJMZrqVgSSX4fEyTxPVl0nxlsqlDfCgMkZVwtXEjrDUZqMd2mGt0yZLCHntGQHg2FirtLI6TKD3OFUuGHbVFQkCgXPLYY2GyXCY71yDYIRpVnEEanaSZLZMW2kbK5RrmA3UdM2bJgHmBtKTyx+g1R1TydrKPWNeSRTokgxIfUDSZtdpDreRTsBTa4v6wPOlheNLgO7uDLSqNFgaS3WHxA1NJLTAGxO4G3on1XqvAyXXbSbhA6nqgwRWLnD8ppsJYJi0kiQd7RCw88yKm7DGvrOplE1SyROo1NDDtdhAdPEEC91M1r3DS2TO48Rt5+aZ//N1KhBqGGxBBJuJ2t7rWy+g8alybJuooio3W46aT3OJApu60AEMaG306gCS6ZBsrlLJqdQVNbtAGiDw7WqdQ8mwPGFfwGWta3Q0wAJaCbE2sJsDE+yVTDran0fHc9svG5b1T3inUhrIgPILnAjha5V0UKbqtFgFQdY0OJLmncEwDpEbG5VfEUY3sq7QNyR4ET8uCTcivjbO0+KoMBhjtQIBuQ4BxF26gAHRzCquw+oX/ALhOZIFh5j9lYpgOEjc7+aS81ScRTpOPdduNjzH7qTu3lS1aIPG/7cVXcTseSFFp0cRz9ipCR6Hgs7CmwVursL+Xpf5Jpdwlmq5F0ty7qMVUbENcdbf6Xf3kLGXQv4l4CadKuPynQ7yddp9xH+pc9Vpdxz5TVJPpASJsJEnwTF6iV9HZPhg3D0XUu5oaIHDSNI+S3adQ6UH/AMMM01YGjqP6mnza4t+k+qNNA4LQtVuvSUug8kkQcwz0ADUgJxBfPii/Oq+oX7vJCVanDiAo5VRsZebK66kXkNb3nENHmTA+azcFUWhh8W6m9r2d5pDgSAbi4MFTgtfp7jgazcOz/Dw7RTEcXgAOPoGtb/pKy+ih/wCIcP8A0MT/APQ9R/hnvJcbkkkk8STJKbleLGExVOpUaTT7TXgblj2OY6PEap9E3vdC9K3RrDNfVBeJp0murVBa7KQ1FsHfUQ1v+pEvRGqyu2q6rRpNOtjQWM0Ne2XV6tPQ2GFwZRs6JAd4oewuNpYZ7jQe+sS1zP5lNrKZY4QQ9hLjUtw7IkDfZbnR7BYqs5tRsMdRMsbpaxjWuHbAYAG3G5iTxOy2IdocsL6h0tbLnSYA9fQIzbQpHCNa6iG1oAJi9nXeDvJ+7K3ltEWpMaxvFxY0NaAImw34RPgp2121GVdIAFMscy14kySeMx8VXHHUa1HigKUCAXBrQBGwa0CXcySDHh6KPHWfDQYcA5oibOE2+I9FESXEuJkkyVJLtOnUdO0Tw4jy8Edmk0lo4c62sgSC3rHOAIEx2BNp4c5NohUq7y57gwbkwBaANvhxVmq57iCXEkXHgRx81FiXkg7X3gAT5xutWmz6mFFSvoPcaWsJ/pAaAPEwfieCyaWANR40CGudpHhJ8bmAtWg9xJqPdOlr3NB4nuSY8XC+5I8E7o6Jququ2psJ4ACZAAHARqshZKMysjJzXCMbVcxkgNgTNyQBJPrKqOpkGePGNj/dXX0S5xfuXEk+ZMn5pjqIKnYvjeEHWA/2+IXnVagPmvHdk+BUmv7+SBkHVEG6uNbI8RccLhMOyfRK04oXpWzbLRWo1KJ2cDHgd2n3AXE6lMtJa4QWkgjkQYIXfZuAuM9MXsONrlm2qDw7QADviCq4oZ/bFSSTmMJIAEkkADmTYBMm65/DF8YNni+of+cj6FdFwOI4IH6O4XqaNOkPyNA8zu4+pJPqiXC1CEsp8seBFqSWT+JPNJNtLwcqzjuwhl9S63syqi6HHm6jeztPCrRw7NRCoYK5AAJJIAA3JOwCO+sZgiKLGMdWGnrqrmh8OInq6YNgACJPFLJutssJlbi2dghvpXhi1t+dkf1sVImGi2zRA9AosswbXa69RrXBoNNrXta4FzoMw4G4A+KtcdwLQ3/D/IKRa+tiWarAMadu0DLj8IlF9TENDdDAGtFoClwPV1Q6mGNYQ0uaWDSLbgtFuKyXwe6fRDWofGb7adB2jD1Kn5qh6tvkO99fYLzJT/KxJ/yN/wC5Q5+/SadEH/Db2v6nXJ++adlRjD4k+DB8T+6bba42bRep2vWbTepm1km1fFoByhrKNj1I1HZLHuYQGuDSHaiNuDGdwefH0T8O3q8I48aroH9It9He6q11o503SKdIfkbfzNvofdOT3pmUgk+mCvRbglKRaK9SgDZZz2OYY3bz/dbE+aa9gIS2G2zW+P7p0nhbxjZeOBYYO3A/RTUjPkhoae1haQZBMDwQL/FfK2h1LEtABqSypH5nNEtd4mAR/pC6E0W5EfFQ5zgG4nDvovbqkSIAkOAlpb4p52jlzHA0R9Csv11etIlrNv6ufpPxCH6jIcW8iR7eaI+iZeDIcA0G8njvYbymvRMea6lhWQFpN81gYCo48bcFo0K35SUm1fFodavVVleo7DTlmZMIWK910R5pTg3Q1VPaKRKiroO9rcRSq1O6x7Z8L970sfRG2ddG8Q+vUfTZrY9xe17XNiHGeJ4SgHooJcW8DdHuFwUjSJjlePZPjJpljL8A4CK1Rpj8tMhxHg5/db6SVp44Oq0KfUNB0lwc1pEi/ZJBM7cfFZ2KeGDq2+sc1n06JqO0taXHkBJR36NMPa82p+HY8lwNZ40w0yKbD3pItqMbDZN6NN11g53cpgvcf6bj4x7FRVclqfmfRZ4PqtB+q0jldSlh+pYWGrUcDU7bRDB3QJImfqUNU1s1pn4rEl7y87uJPlyHsr2DMYPEEfrYPiz91VdkteLho8TUZH/Ur2EoNZg6wfUYRrYSaRFSLsgcBJI58VpK2VnGmVg5qENbdxO33wVjFt6uo5kzpMSpcmrh1emyk3Q0uBcZl7w3tdp3AdnYQPNOoUG1qtas8xRY9+o8+1Zo8Tb3HNDXBvPk2g17gXNY4gbkNMJ7allZyzOnOxDB3aZ7AYLAA93zMxfzVfOKYp1ntFhMjyIn6o6L5buqnyxmusxvI6vRt/mAnZlX1VnnkY9rfRSdGP8Azasd1sD17RHwb7pxe3DBupofWd2nzfSDuB47p9cJ28qL3KAuPJbGe0AHNeyNLxw2kRf1BHssxzEli2OW4jD05MDYUjUDPKlIOEFUGgtdpPp4rUY1MxuE1C242WsDaDEUnOYerPbEOb4kbtNxYi3qpsqxoqsDoIOxB3a4Wc0+IP2NlTwtctN9xupq7dLxXbGl0Nqj/oqemxngdxBky7LZpzL+J+TmjizVDf5dYagRtrFnt89j6pnQ/CAjVzJ+BsuhdPcAK2ArW7VMda3mCw9r/l1BCXQ7CltJs+d/G6OXRcJ+wlo0bDceS0GUTulQaIBPNe1jq7IJjiR8kki1qbrX/q+KSh/Ct5H3XiJAbnwJagwi6Ks2x4MwhV5uUsRre6M4kMqtnY2XUMJX00y70XMujeXhzmEiZIsui5pXAAZy+abHiGxm1Z5J9Vp4an/w+mnUYx5cdep2glsDSATu3eQs7BAESn1efsjFMps+kylRvatUG0A9U08yTBefgqVaXvLnHU4mSTupXLxroS2mkM6k25LRwTf+FxTP/ad7Pv8AJVS6ymy6uGucHToexzHRuA7ZwHGCB8UYXLpb6FUCaz3fpYYn9TjA+Acvc6qhumhT/wAOn3j+qpxJ+PrPgosnzJtCjVDZNV5gGLAAWJPgS6yq4d4iDdHfGiyftum0zpIcN2kEeYMhbHTRn+HWb3XCJ+LfcE+yyG3srlPOK1KnoGh7eAqNJjwsRZaXhspd7jc6PvFHBio780v85MMA8wG+6xajjUJe43Jv+yfmudCuGMYCA25kAS6IEAE2F/dNoOFvFNssw91sUG9dhtA79LYeA29228wspr7KajVcw62GD8CORHEKZ2ZBxnqaermbiecI0MdxVNB2nVw4E8fAc1FCs1KheZcZPy8uSic1IpKVMK01VApqTkWqrjsJ+YJuBqwYIkGxWoWyFl1qelyFntpdzVW6dFpa+k4S2C0gjdpEQedigzK6XVlzJnQS3aNiQPkjWhUBv+aInmOE+59ysPM6QbWdA73aPnxWy6HDtJh3A+adl197EwY5S0WUdCIMhWMgGtzP82g+cgH4oQcmj+APIeySIfxI5L1PqIfky+nzvjFlP3SSUcWHPRHvU/IfREWa98+aSSedKYJML/h+p+a9O/okkiaGlMKSSWmOOyj5JJIM8CmoJJIsfS7xXuI2SSRgXtWw+/qtOjsPNJJaNVunso2bpJJ/SU7ShNKSSB3h4J1FJJAV6iqeP3SSTXomP+kWGVTOu+P6fqkklvR5/pAe4fI/Je9C+5hv6aX/AEBJJbFsh0kkkncr/9k=";
      var txtMsg = {
        type: 2,
        convId: this.convIdFromDataTranfer,
        message: {
          content : "",
          photo: {
              filePath: filePath, // image's url
              thumbnail: "", // thumbnail's url
              ratio: "" // image's ratio
          },
          metadata: {
            key: 'value'
          }
      }
      };
      this.stringeeService.stringeeChat.sendMessage(txtMsg, function (status, code, message, msg) {
        console.log(status + code + message + "msg result " + JSON.stringify(msg));
      });
    });
    reader.readAsDataURL(file);
  }

  /* #region  XỬ LÝ PHẦN GIAO DIỆN  */

  //   Ẩn hay Hiển thị phần thông tin tin nhắn
  toggleInfo() {
    this.showAboutRight = !this.showAboutRight;
  }

  // Tự động Scollbar khi gửi tin nhắn
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private scrollContainer: any;
  private items = [];

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

    /*
      Xem trước hình ảnh
   */
  watchImagePreview(src) {
    this.imagePreview = src;
  }
}

