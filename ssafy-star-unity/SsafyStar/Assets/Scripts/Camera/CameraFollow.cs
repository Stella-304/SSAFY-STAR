using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class CameraFollow : MonoBehaviour
{
	public Transform listenerTf;
	public Vector3 posOffset;
	public Vector3 lookOffset;

	private void LateUpdate()
	{
		if (ControllerPrototype.Local is ControllerPrototype p && p != null)
		{
			transform.position = p.transform.position + posOffset;
			transform.LookAt(p.transform.position + lookOffset);
			listenerTf.position = p.transform.position + lookOffset;
		}
	}
}
