using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class NetworkPlayer : NetworkBehaviour, IPlayerLeft
{
    public static NetworkPlayer Local { get; set; }

    private void Start()
    {
        
    }

    //�÷��̾ ���������� ����Ǵ� �Լ�
    public override void Spawned()
    {
        //��Ʈ�� �� �� �ִ� ������Ʈ���(���� �÷��̾���)
        if(Object.HasInputAuthority)
        {
            Local = this;

            Debug.Log("���� �÷��̾� ����");
        }
        else
        {
            Debug.Log("����Ʈ �÷��̾� ����"); 
        }
    }

    public void PlayerLeft(PlayerRef player)
    {
        //���� �÷��̾���
        if(player == Object.InputAuthority)
        {
            //�������� �ϱ�
            Runner.Despawn(Object);
        }
    }
}
