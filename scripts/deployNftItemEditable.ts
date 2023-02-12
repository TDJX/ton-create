import { toNano } from 'ton-core';
import { NftItemEditable } from '../wrappers/NftItemEditable';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const nftItemEditable = NftItemEditable.createFromConfig({}, await compile('NftItemEditable'));

    await provider.deploy(nftItemEditable, toNano('0.05'));

    const openedContract = provider.open(nftItemEditable);

    // run methods on `openedContract`
}
