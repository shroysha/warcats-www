import { Button, ScrollViewer, StackPanel } from 'babylonjs-gui';
import { Building, getUnitCost, MapPosition, UnitPath } from 'warcats-common';
import { tileToWorldPosition } from '../helpers';
import { WarCatGame } from '../WarCatGame';

export const unitPurchaseInfos = [
  { unitPath: UnitPath.RedAA, cost: getUnitCost(UnitPath.RedAA) },
  { unitPath: UnitPath.RedHeli1, cost: getUnitCost(UnitPath.RedHeli1) }
];

export class BuildingPurchasePopup extends StackPanel {
  constructor(
    private readonly warCatGame: WarCatGame,
    private readonly building: Building
  ) {
    super();
    this.warCatGame.uiTexture.addControl(this);

    const worldPos = tileToWorldPosition(building.position);
    console.log('clicked at', worldPos);

    const myScrollViewer = new ScrollViewer();
    myScrollViewer.width = '100px';
    myScrollViewer.height = '100px';
    myScrollViewer.horizontalBar.dispose();
    const innerStack = new StackPanel('inner stack');
    let top = 0;
    for (const unitPurchaseInfo of unitPurchaseInfos) {
      const button = Button.CreateSimpleButton(
        'buy' + unitPurchaseInfo.unitPath.toString(),
        'Buy ' + unitPurchaseInfo.unitPath.toString()
      );
      button.width = '100px';
      button.height = '40px';
      button.color = 'white';
      button.background = 'green';
      button.onPointerClickObservable.add(() =>
        this.setPendingPurchase(unitPurchaseInfo.unitPath)
      );
      button.top = top + 'px';
      top += 40;
      innerStack.addControl(button);
    }
    myScrollViewer.addControl(innerStack);

    const button2 = Button.CreateSimpleButton('but2', 'Cancel');
    button2.width = '100px';
    button2.height = '40px';
    button2.color = 'white';
    button2.background = 'green';
    button2.onPointerClickObservable.add(() => this.doBottomButtonAction());

    this.addControl(myScrollViewer);
    this.addControl(button2);
    this.leftInPixels = worldPos.x * 105 + 135;
    this.topInPixels = -worldPos.y * 105 + 40;
  }

  private setPendingPurchase(unitPath: UnitPath) {
    console.log('doing top button action');
    this.warCatGame.setPendingPurchase(unitPath, this.building);
  }

  private doBottomButtonAction() {
    console.log('doing top button action');
    this.warCatGame.destroyPopup();
  }
}
