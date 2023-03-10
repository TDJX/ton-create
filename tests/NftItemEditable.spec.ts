import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { NftItemEditable } from '../wrappers/NftItemEditable';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('NftItemEditable', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('NftItemEditable');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const nftItemEditable = blockchain.openContract(NftItemEditable.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await nftItemEditable.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftItemEditable.address,
            deploy: true,
        });
    });
});
