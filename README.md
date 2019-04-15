# DigitalContents - Galaxy Wars
* #### 장르 : RTS 
* #### 역할 : 프로그래머(인게임 구현)
* #### 개발 언어/툴 : Javascript, Node.js

## 프로젝트 소개
### 게임 소개
* 해당 게임은 스타크래프트를 직관적이고 가볍게 플레이 가능하도록 제작한 웹게임으로 온 우주를 배경으로 하는 4인 멀티플레이 RTS 게임입니다.
* 은하와 우주선의 업그레이드, 유닛생산, 특수 스킬등의 다양한 시스템간의 상호작용을 통한 경쟁, 전략을 유도하였습니다.
+ **조작법**
   + 오브젝트 선택 : 마우스 좌클릭
   + 우주선 이동 및 공격 명령 : 마우스 우클릭
   + 시점 이동 : WASD
   + 시점이동 속도 증가 : WASD + SPACE
* **용어**
  * Carbon(C) : 은하에서 생성되며, 우주선 및 은하의 업그레이드 등에 사용되는 자원이다. 게임의 점수와 직결된다.
  * 은하 : 자원을 생성하며, 플레이어의 영토
      * 백색 은하 : 소속이 없는 은하
      * 테라포밍 : 은하의 생산력을 증가시켜주는 업그레이드
      * 베리어 : 은하의 방어력을 증가시켜주는 업그레이드
  * 우주선 : 플레이어가 컨트롤 가능하며, 은하혹은 적 우주선 공격시 사용된다.
      * 무기 : 우주선의 공격력을 증가시켜주는 업그레이드
      * 방어 : 우주선의 방어력을 증가시켜주는 업그레이드
      * 엔진 : 우주선의 속력을 증가시켜주는 업그레이드
      * 기뢰 : 상대 우주선이 다가올시 매우 강력한 데미지를 주는 지뢰를 설치한다.
### 게임 화면
* **게임의 메인화면입니다. 인게임에서의 닉네임을 입력할 수 있습니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56102123-ac62c300-5f65-11e9-8b03-c39e0627c82c.png></img>
* **게임의 로비입니다. 어떠한 게임을 진행할지 선택 가능하지만 CustomGame 기능은 미구현 되었습니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132028-f1b5dd80-5fc3-11e9-9fde-a465c1e63275.png></img>
* **시작 버튼을 누르면 방이 생성될동안 로딩화면으로 변경됩니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56102124-ac62c300-5f65-11e9-9092-71d75f2cc710.png></img>
<br></br>
* **인게임 화면 중 하나입니다. 엔터키를 눌러 채팅을 입력할 수 있습니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56107512-b2ff3380-5f81-11e9-8691-9f34a856dca5.png></img>
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56107513-b397ca00-5f81-11e9-9f59-36d0a04b1f3f.png></img>

* **왼쪽 하단 UI를 통해 우주선의 관리 및 추가가 가능합니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132045-fc707280-5fc3-11e9-8cc5-c25eb77fcc34.png></img>
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132049-fd090900-5fc3-11e9-9bc6-54423c28ebf5.png></img>

* **우주선으로 은하를 공격하여 주인이 없거나 다른 플레이어 소유인 은하를 점령가능합니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132064-05f9da80-5fc4-11e9-9fa1-9be4b215dc72.png></img>
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132066-06927100-5fc4-11e9-9556-1320f3f81031.png></img>

* **자신이 점령한 은하 또한 업그레이드가 가능합니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132051-009c9000-5fc4-11e9-8372-124528100ae3.png></img>
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56132058-03978080-5fc4-11e9-8db6-bde9443f6339.png></img>

* **자신의 우주선은 중앙 하단 UI를 통해 여러가지 능력치를 업그레이드 할 수 있습니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56102126-ac62c300-5f65-11e9-8453-fbba268944b2.png></img>

* **적 유닛 파괴시 이펙트입니다.**<br></br>
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56102127-acfb5980-5f65-11e9-8a2f-9b69bdf404fa.png></img>
<br></br>
* **왼쪽 상단에 존재하는 카본이 모두 소모되어 버릴 경우 파산을 하게되며, 관전상태로 변경됩니다.**
<img width="70%" src=https://user-images.githubusercontent.com/40797534/56102128-acfb5980-5f65-11e9-80a5-80e0741cb61b.png></img>

* **10분이 지나가너 모든 플레이어가 파산 상태가 될시 게임이 종료됩니다.**
> 1위<br></br>
> <img width="46%" src=https://user-images.githubusercontent.com/40797534/56132076-0b572500-5fc4-11e9-913b-0a6198d92265.png></img>
> <br></br>2위<br></br>
> <img width="46%" src=https://user-images.githubusercontent.com/40797534/56132644-7bb27600-5fc5-11e9-8bad-b354f8fcc241.png></img>
