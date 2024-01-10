import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  
  /*------------------------------------------
  --------------------------------------------
  Declare Form
  --------------------------------------------
  --------------------------------------------*/
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  selectedImageUrl: string | undefined;

    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor() { }

  ngOnInit(): void {
      
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.myForm.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });

      // Obtiene el archivo de imagen del input
      this.selectedImageUrl = URL.createObjectURL(file);
    }
  } 
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    const formData = new FormData();
  
    const fileSourceValue = this.myForm.get('fileSource')?.value;
  
    if (fileSourceValue !== null && fileSourceValue !== undefined) {
        formData.append('file', fileSourceValue);
    }

    console.log(fileSourceValue);
       
    /* this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      }) */
  } 

}
