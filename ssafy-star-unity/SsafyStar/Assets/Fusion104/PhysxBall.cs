using Fusion;
using UnityEngine;

namespace Fusion104
{
	public class PhysxBall : NetworkBehaviour
	{
		[Networked] private TickTimer life { get; set; }

		public void Init(Vector3 forward)
		{
			life = TickTimer.CreateFromSeconds(Runner, 5.0f);
			GetComponent<Rigidbody>().velocity = forward;
		}

		public override void FixedUpdateNetwork()
		{
			if(life.Expired(Runner))
				Runner.Despawn(Object);
		}
	}
}
