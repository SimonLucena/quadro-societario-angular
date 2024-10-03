import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SocioService } from "../../services/socio.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']  // Corrigido: styleUrls no plural
})
export class SocioComponent implements OnInit {
  socios: any[] = [];
  displayedColumns: string[] = ['acoes', 'nome', 'cnpj_cpf', 'participacao'];
  exibirFormulario = false;  // Controla a exibição do formulário
  socioForm: FormGroup;  // Formulário de cadastro de sócio
  erroParticipacao: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private socioService: SocioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.socioForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      participacao: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.getSocios();
  }

  getSocios(): void {
    const codigoidEmpresa = this.data.codigoid;
    this.socioService.getSociosByEmpresa(codigoidEmpresa).subscribe((data: any) => {
      this.socios = data;
    }, (error) => {
      alert('Erro ao carregar sócios: ' + error.message);
    });
  }

  adicionarSocio() {
    this.exibirFormulario = true;  // Mostra o formulário
    console.log(this.exibirFormulario)
  }

  cadastrarSocio(): void {
    const novoSocio = this.socioForm.value;
    if (novoSocio.nome === '') {
      alert('Informe o nome do sócio.');
      return;
    }
    if (novoSocio.cnpj_cpf === '') {
      alert('Informe o CPF/CNPJ do sócio.');
      return;
    }
    if (novoSocio.participacao === '' || novoSocio.participacao === 0) {
      this.socioForm.patchValue({ participacao: 0 });  // Atualiza o campo no formulário
      novoSocio.participacao = 0;
    }
    if (this.socioForm.valid) {
      novoSocio.nome = this.capitalize(novoSocio.nome);

      novoSocio.codigoid_empresa = this.data.codigoid;

      console.log(novoSocio);

      const somaParticipacaoAtual = this.socios.reduce((total, socio) => total + socio.participacao, 0);
      const novaParticipacao = +novoSocio.participacao;

      if (somaParticipacaoAtual + novaParticipacao > 100) {
        alert('A soma das participações dos sócios não pode ultrapassar 100%.');
        return;  // Impede o cadastro se a soma for maior que 100%
      }
      console.log("participação")

      this.socioService.criarSocio(novoSocio).subscribe(() => {
        this.exibirFormulario = false;
        this.erroParticipacao = '';
        this.getSocios();
        alert('Sócio criado com sucesso');
      }, (error) => {
        alert('Erro ao criar sócio: ' + error.message);
      });
    }
  }

  capitalize(nome: string): string {
    return nome.replace(/\b\w/g, (letra) => letra.toUpperCase());
  }


  cancelar() {
    this.exibirFormulario = false;
    this.socioForm.reset();
    this.erroParticipacao = '';
  }

  excluirSocio(codigoid: string): void {
    if (confirm('Você tem certeza que deseja excluir este sócio?')) {
      this.socioService.deletarSocio(codigoid).subscribe(() => {
        alert('Sócio excluído com sucesso');
        this.getSocios();  // Atualiza a lista de sócios após excluir
      }, (error) => {
        alert('Erro ao excluir sócio: ' + error.message);
      });
    }
  }
}
