// Module['arguments'] = [
//     '-nographic', '-m', '512M', '-accel', 'tcg,tb-size=500',
//     //Use the following to enable MTTCG
//     //'-nographic', '-m', '512M', '-accel', 'tcg,tb-size=500,thread=multi', '-smp', '4,sockets=4',
//     '-machine', 'virt',
//     '-L', '/pack/',
//     '-nic', 'none',
//     '-drive', 'if=virtio,format=raw,file=/pack/rootfs.bin',
//     '-kernel', '/pack/Image',
//     '-append', 'earlyprintk=ttyS0 console=ttyS0 root=/dev/vda rootwait ro quiet virtio_net.napi_tx=false loglevel=7',
// ];


Module['arguments'] = [
          "-machine", "virt",
          "-bios", "none",
          "-nographic",
          "-m", "32M",

          "-global", "virtio-mmio.force-legacy=false",

          // Simple: UART to stdio
          "-serial", "null",
          "-serial", "mon:stdio",
        //   "-serial", "tty",
        //   "-serial", "null",

             '-L', '/pack/',

          // Files from /pack (qemu-system-riscv64.data)
          "-kernel", "/pack/kernel.elf",
          "-object", "rng-random,filename=/dev/urandom,id=rng0",
          "-device", "virtio-rng-device,rng=rng0",

          "-drive",
          "file=/pack/ktfs.raw,id=blk0,if=none,format=raw,readonly=false",
          "-device", "virtio-blk-device,drive=blk0",
          '-append', 'earlyprintk=ttyS0 console=ttyS0 root=/dev/vda rootwait ro quiet virtio_net.napi_tx=false loglevel=7',
        ]


// Module['arguments'] = [
//   // Basic machine + memory setup
//   '-nographic',
//   '-m', '8M',
//   '-machine', 'virt',
//   '-bios', 'none',

//   // Match your Makefile: virtio-mmio.force-legacy=false
//   '-global', 'virtio-mmio.force-legacy=false',

//   // Simple: QEMU serial -> the xterm terminal
//   '-serial', 'mon:stdio',
//   "-serial", "pty",

//   // Your disk image
//   '-drive',
//   'file=/pack/ktfs.raw,id=blk0,if=none,format=raw,readonly=false',
//   '-device', 'virtio-blk-device,drive=blk0',

//   // Your kernel
//   '-kernel', '/pack/kernel.elf',
// ];