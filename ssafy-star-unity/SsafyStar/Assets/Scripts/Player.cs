using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using Fusion;


public class Player : NetworkBehaviour
{
    private NetworkCharacterController _cc;

    private void Awake()
    {
        _cc = GetComponent<NetworkCharacterController>();
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
