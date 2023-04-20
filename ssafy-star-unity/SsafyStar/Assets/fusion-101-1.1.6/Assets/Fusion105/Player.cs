using Fusion;
using UnityEngine;

namespace Fusion105
{
	public class Player : NetworkBehaviour
	{
		[SerializeField] private Ball _prefabBall;
		[SerializeField] private PhysxBall _prefabPhysxBall;

		[Networked] private TickTimer delay { get; set; }

		private NetworkCharacterControllerPrototype _cc;
		private Vector3 _forward;

		private void Awake()
		{
			_cc = GetComponent<NetworkCharacterControllerPrototype>();
			_forward = transform.forward;
		}

		public override void FixedUpdateNetwork()
		{
			if (GetInput(out NetworkInputData data))
			{
				data.direction.Normalize();
				_cc.Move(5*data.direction*Runner.DeltaTime);

				if (data.direction.sqrMagnitude > 0)
					_forward = data.direction;

				if (delay.ExpiredOrNotRunning(Runner))
				{
					if ((data.buttons & NetworkInputData.MOUSEBUTTON1) != 0)
					{
						delay = TickTimer.CreateFromSeconds(Runner, 0.5f);
						Runner.Spawn(_prefabBall, transform.position+_forward, Quaternion.LookRotation(_forward), Object.InputAuthority, (runner, o) =>
						{
							o.GetComponent<Ball>().Init();
						});
						spawned = !spawned;
					}
					else if ((data.buttons & NetworkInputData.MOUSEBUTTON2) != 0)
					{
						delay = TickTimer.CreateFromSeconds(Runner, 0.5f);
						Runner.Spawn(_prefabPhysxBall, transform.position+_forward, Quaternion.LookRotation(_forward), Object.InputAuthority, (runner, o) =>
						{
							o.GetComponent<PhysxBall>().Init( 10*_forward );
						});
						spawned = !spawned;
					}
				}
			}
		}
		
		[Networked(OnChanged = nameof(OnBallSpawned))]
		public NetworkBool spawned { get; set; }
		
		public static void OnBallSpawned(Changed<Player> changed)
		{
			changed.Behaviour.material.color = Color.white;
		}

		private Material _material;
		Material material 
		{
			get
			{
				if(_material==null)
					_material = GetComponentInChildren<MeshRenderer>().material;
				return _material;
			}
		}

		public override void Render()
		{
			material.color = Color.Lerp(material.color, Color.blue, Time.deltaTime );
		}
	}
}
