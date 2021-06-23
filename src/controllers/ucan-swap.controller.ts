// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get, param, post} from '@loopback/rest';
import {SwapController} from "./swap.controller";

export class UcanSwapController {
  public _valorA: number;
  public _valorB: number;
  public valorK: number;
  public accountAddress: string;

  constructor(
    valorA: number,
    valorB: number,
    valorK: number,
    accountAddress: string
  ) {
    this._valorA = valorA;
    this._valorB = valorB;
    this.valorK = valorK;
    this.accountAddress = accountAddress;
  }

  @get('/produto_constante/{valor}')
  public produtoConstante(
    @param.path.number('valor') valor: number
  ): number {
    return this.valorK / valor;
  }

  @post('/fazer_troca/{endereco_origem}/{endereco_destino}/{new_b}/{private_key}')
  public fazerTroca(
    @param.path.string('endereco_origem') enderecoOrigem: string,
    @param.path.string('endereco_destino') enderecoDestino: string,
    @param.path.number('new_b') newB: number,
    @param.path.string('private_key') privateKey: string
  ): Promise<boolean> {
    const valorTroca = this._valorA - (this.valorK / (this._valorB + newB));

    const sc: SwapController = new SwapController(this.accountAddress, privateKey);

    return sc.tansferirPara(enderecoOrigem, enderecoDestino, valorTroca);
  }
}
