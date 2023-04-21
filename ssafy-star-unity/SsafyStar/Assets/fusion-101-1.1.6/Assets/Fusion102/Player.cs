using Fusion;
using UnityEngine;

namespace Fusion102
{
	public class Player : NetworkBehaviour
	{
		private NetworkCharacterControllerPrototype _cc;

		[SerializeField]
		private Ball _prefabBall;

		private Vector3 _forward;

		private void Awake()
		{
			_cc = GetComponent<NetworkCharacterControllerPrototype>();
		}

		public override void FixedUpdateNetwork()
		{
			if (GetInput(out NetworkInputData data))
			{
				data.direction.Normalize();
				_cc.Move(5*data.direction*Runner.DeltaTime);

				if(data.direction.sqrMagnitude>0)
				{
                    _forward = data.direction;
                }

				if((data.buttons & NetworkInputData.MOUSEBUTTON1)!= 0)
				{
					Runner.Spawn(_prefabBall,
								 transform.position + _forward, Quaternion.LookRotation(_forward),
								 Object.InputAuthority);
				}
			}
		}
	}
}
