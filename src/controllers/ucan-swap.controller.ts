// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {param, post} from '@loopback/rest';
import {SwapController} from "./swap.controller";

export class UcanSwapController {
  public _valorA: number;
  public _valorB: number;
  public valorK: number;

  constructor(
    valorA: number,
    valorB: number,
    valorK: number
  ) {
    this._valorA = valorA;
    this._valorB = valorB;
    this.valorK = valorK;
  }

  // @get('/produto_constante/{valor}')
  // public produtoConstante(
  //   @param.path.number('valor') valor: number
  // ): number {
  //   return this.valorK / valor;
  // }

  @post('/consultar')
  async consultar(
    @param.path.string('endereco_conta') enderecoConta: string,
    @param.path.string('private_key') privateKey: string
  ) {
    try {
      const sc: SwapController = new SwapController(enderecoConta, privateKey);
      const saldo = await sc.consultarSaldo(enderecoConta);
      return saldo;

    } catch (error) {
      console.log(error);
    }

    return false;
  }


  @post('/fazer_troca')
  async fazerTroca(
    @param.path.number('valor_a') _valorA: number,
    @param.path.number('valor_b') _valorB: number,
    @param.path.number('valor_k') valorK: number,
    @param.path.string('endereco_origem') enderecoOrigem: string,
    @param.path.string('endereco_destino') enderecoDestino: string,
    @param.path.number('new_b') newB: number,
    @param.path.string('private_key') privateKey: string
  ): Promise<boolean> {
    try {
      const ucs: UcanSwapController = new UcanSwapController(_valorA, _valorB, valorK);
      ucs._valorA = _valorA;
      ucs._valorB = _valorB;
      ucs.valorK = valorK;

      const valorTroca = ucs._valorA - (ucs.valorK / (ucs._valorB + newB));

      const sc: SwapController = new SwapController(enderecoOrigem, privateKey);

      const sucesso = await sc.tansferirPara(enderecoOrigem, enderecoDestino, valorTroca);

      return sucesso;

    } catch (error) {
      console.log(error);
    }

    return false;
  }
}
