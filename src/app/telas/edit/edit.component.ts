import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "../../services/empresa.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  empresaForm: FormGroup;
  titulo: string = 'Nova Empresa';  // Define o título padrão para criação

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Recebe os dados da empresa (pode ser `null` para nova empresa)
  ) {
    this.empresaForm = this.fb.group({
      cnpj: ['', [Validators.required]],
      razao_social: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      // Se os dados forem passados, é uma edição de empresa
      this.titulo = 'Editar Empresa';
      this.empresaForm.patchValue({
        cnpj: this.data.cnpj,
        razao_social: this.data.razao_social
      });
    }
  }

  salvar(): void {
    if (this.empresaForm.valid) {
      const empresaData = this.empresaForm.value;

      if (this.data) {
        // Atualizar empresa existente
        this.empresaService.atualizarEmpresa(this.data.codigoid, empresaData).subscribe(() => {
          alert('Empresa atualizada com sucesso');
          this.dialogRef.close(true);
        }, (error) => {
          alert('Erro ao atualizar empresa: ' + error.message);
        });
      } else {
        // Criar nova empresa
        this.empresaService.criarEmpresa(empresaData).subscribe(() => {
          alert('Nova empresa criada com sucesso');
          this.dialogRef.close(true);
        }, (error) => {
          alert('Erro ao criar empresa: ' + error.message);
        });
      }
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
