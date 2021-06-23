// Uncomment these imports to begin using these cool features!

const {ethers} = require('ethers');
const provider = new ethers.providers.getDefaultProvider('ropsten');

const abi = [
  "function balanceOf(address tokenOwner) public view returns (uint balance)",
  "function transfer(address to, uint tokens) public returns (bool success)",
  "function approve(address spender, uint tokens) public returns (bool success)",
  "function transferFrom(address from, address to, uint tokens) public returns (bool success)"
];

export class SwapController {
  private wallet;
  private contracto;

  constructor(
    contractAddress: string,
    privateKey: string
  ) {
    this.wallet = new ethers.Wallet(privateKey, provider);
    this.contracto = new ethers.Contract(contractAddress, abi, this.wallet);
  }

  async consultarSaldo(accountAddress: string) {
    try {
      const saldo = await this.contracto.balanceOf(accountAddress);
      return saldo;

    } catch (err) {
      console.log(err);
    }
  }

  async tansferir(
    enderecoDestino: string,
    valor: number
  ): Promise<boolean> {
    try {
      const sucesso = await this.contracto.transfer(
        enderecoDestino,
        valor
      );
      return sucesso;

    } catch (err) {
      console.log(err);

    }

    return false;
  }

  async tansferirPara(
    enderecoOrigem: string,
    enderecoDestino: string,
    valor: number
  ): Promise<boolean> {
    try {
      const sucesso = await this.contracto.transferFrom(
        enderecoOrigem,
        enderecoDestino,
        valor
      );
      return sucesso;

    } catch (error) {
      console.log(error);
    }

    return false;
  }
}
