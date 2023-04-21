using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using Fusion;

namespace garden
{
    public class Player : NetworkBehaviour
    {
        private NetworkCharacterControllerPrototype _cc;

        private void Awake()
        {
            _cc = GetComponent<NetworkCharacterControllerPrototype>();
        }

        //모든 시뮬레이션 틱에서 호출
        //각 틱에 올바른 입력이 적용되도록 하려면 FixedUpdateNetwork에서 입력을 적용
        //1. Fusion은 GetInput()이라는 적절한 이름의 관련 틱에 대한 입력을 얻을 수 있는 간단한 메소드를 제공
        //2. 입력을 획득하면 NetworkCharacterController가 호출되어 아바타 변환에 실제 움직임을 적용
        public override void FixedUpdateNetwork()
        {
            if (GetInput(out NetworkInputData data))
            {
                data.direction.Normalize();
                _cc.Move(5 * data.direction * Runner.DeltaTime);
            }
        }
    }

}
