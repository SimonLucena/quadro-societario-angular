import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../../services/empresa.service";
import {SocioComponent} from "../socio/socio.component";
import { MatDialog } from '@angular/material/dialog';
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  empresas: any[] = [];
  displayedColumns: string[] = ['acoes', 'cnpj', 'razao_social'];

  constructor(private empresaService: EmpresaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    })
  }

  excluirEmpresas(id: string): void {
    this.empresaService.deletarEmpresa(id).subscribe(() => {
      this.getEmpresas();
    })
  }

  adicionarEmpresa(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: null  // Passa `null` para indicar que é uma nova empresa
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmpresas();  // Atualiza a lista de empresas após criar a nova
      }
    });
  }


  editarEmpresa(codigoid: string): void {
    // Busca os dados da empresa antes de abrir o modal
    this.empresaService.getEmpresaById(codigoid).subscribe((empresa) => {
      const dialogRef = this.dialog.open(EditComponent, {
        width: '400px',
        data: empresa  // Passa os dados da empresa para o modal
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Atualiza a lista de empresas após edição
          this.getEmpresas();
        }
      });
    });
  }


  excluirEmpresa(codigoid: string): void {
    if (confirm('Você tem certeza que deseja excluir esta empresa e todos os sócios associados?')) {
      this.empresaService.deletarEmpresa(codigoid).subscribe(() => {
        alert('Empresa e sócios excluídos com sucesso');
        this.getEmpresas();  // Atualiza a lista de empresas após excluir
      }, (error) => {
        alert('Erro ao excluir empresa: ' + error.message);
      });
    }
  }


  verSocios(codigoid: string): void {
    const dialogRef = this.dialog.open(SocioComponent, {
      width: '680px',
      data: { codigoid: codigoid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado', result);
    });
  }
}
