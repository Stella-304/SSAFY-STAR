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

        //��� �ùķ��̼� ƽ���� ȣ��
        //�� ƽ�� �ùٸ� �Է��� ����ǵ��� �Ϸ��� FixedUpdateNetwork���� �Է��� ����
        //1. Fusion�� GetInput()�̶�� ������ �̸��� ���� ƽ�� ���� �Է��� ���� �� �ִ� ������ �޼ҵ带 ����
        //2. �Է��� ȹ���ϸ� NetworkCharacterController�� ȣ��Ǿ� �ƹ�Ÿ ��ȯ�� ���� �������� ����
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
